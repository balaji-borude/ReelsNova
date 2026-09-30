import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("auth middleware called ");

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized ",
        });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    console.log("JWT secret -->", JWT_SECRET);
    if (!JWT_SECRET) {
        return res.status(500).json({
            success: false,
            error: "JWT Secret is not defined",
        });
    }

    try {

        const decodedToken = jwt.verify(token, JWT_SECRET as string) as {
            id: string;
            email: string;
        };

        console.log("Decoded token --> ", decodedToken);

        req.user = decodedToken;

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'token is invalid',
        });
    }

    next();

}