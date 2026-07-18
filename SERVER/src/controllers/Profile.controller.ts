import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { uploadFileToS3 } from "../services/s3.service";
import { updateProfileImage } from "../services/profile.service";

// getProfile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(req.params);
    console.log("request params", req.params.userId);
    if (!userId) {
      return res.status(409).json({
        success: false,
        message: "UserId is Required",
      });
    }

    // get all data of user
    const UserDetails = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!UserDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log("Printing UserDetails -->", UserDetails);
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: UserDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: "Server error",
    });
  }
};

export const uploadProfileImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // console.log("uploadProfileImage =>", req.file);
    // 1. Check if file exists
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
      return;
    }

    // 2. Get authenticated user id
    // Change this according to your auth middleware
    // const userId = Number(req.user?.id);
    const userId = 1;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // 3. Upload image to S3 --> this is for Profile Images
    // i will use same to upload the file to s3 for post use 'Posts' for 'reels' 'stories' 'chat'
    const imageUrl = await uploadFileToS3(req.file, "profile-images");

    // 4. Save image URL in database
    const updatedUser = await updateProfileImage(userId, imageUrl);

    // 5. Return response
    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Upload Profile Image Error ----->", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload profile image.",
    });
  }
};

// edit Profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid UserId",
      });
    }

    const { fullName, username, bio, website, location, isPrivate } = req.body;

    const existinguserName = await prisma.users.findUnique({
      where:{
        username:username
      }
    });
    if(existinguserName){
      return res.status(409).json({
        status:false,
        message:"userName is Alredy Exist"
      })
    }

    // find the user by id
    const existingUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not Found",
      });
    }

    await prisma.users.update({
      where:{id:userId},
      data:{
        fullName,
        username,
        bio,
        website,
        location,
        isPrivate
      }
    })

    return res.status(200).json({
      status: true,
      message: "Profile Updated succesfully",
    });

  } catch (error) {
    console.log("Issue in Profile Edit --->", error);
    return res.status(500).json({
      success: true,
      message: "Error in Profile Edit ",
    });
  }
};
