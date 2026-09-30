import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { uploadFileToS3 } from "../services/s3.service";
import { updateProfileImage } from "../services/profile.service";

// getProfile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const  userId  = req.user?.id;

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

    // 2. Get user id from route (auth middleware can replace this later)
    const userId = Number(req.user?.id);

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Invalid UserId",
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
    const userId = Number(req.user?.id);
   
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid UserId",
      });
    }

    const { fullName, username, bio, website, location, isPrivate } = req.body;

    // find the user by id first
    const existingUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    // Only check username uniqueness if a new username is provided
    // and it's different from the current one
    if (username && username !== existingUser.username) {
      const existingUserName = await prisma.users.findUnique({
        where: {
          username: username,
        },
      });

      if (existingUserName) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken",
        });
      }
    }

    // Basic validation
    if (bio && bio.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Bio cannot exceed 200 characters",
      });
    }

    // Build update data with only the fields that were actually provided
    // (partial update — avoids wiping out existing values with empty strings)
    const updateData: {
      fullName?: string;
      username?: string;
      bio?: string;
      website?: string;
      location?: string;
      isPrivate?: boolean;
    } = {};

    if (fullName !== undefined) updateData.fullName = fullName;
    if (username !== undefined) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio;
    if (website !== undefined) updateData.website = website;
    if (location !== undefined) updateData.location = location;
    if (isPrivate !== undefined) updateData.isPrivate = isPrivate;

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        website: true,
        location: true,
        isPrivate: true,
        profileImage: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Issue in Profile Edit --->", error);
    return res.status(500).json({
      success: false,
      message: "Error in Profile Edit",
    });
  }
};
