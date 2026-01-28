import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();



// SignUp Controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
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

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All Fields are required",
      });
    }

    // generate the jwt token
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Printing user backend -->", user);
    // if user is not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // if password is not valid
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid password",
      });
    }

    const Payload = {
      id: user.id,
      email: user.email,
      password: undefined,
    };
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({
        success: false,
        error: "JWT Secret is not defined",
      });
    }
    // token created
    const token = jwt.sign(Payload, JWT_SECRET as string, {
      expiresIn: "3d",
    });

    // we want to remove password from the user and then send to the response 
     //user.password = undefined;

    // send the response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user:{
        id:user.id,
        email:user.email
      }
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};
