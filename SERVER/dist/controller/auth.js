"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// SignUp Controller
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "All fields are required",
            });
        }
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existing) {
            return res.status(409).json({
                success: false,
                error: "Email already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: "Server error",
        });
    }
};
exports.signup = signup;
// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "All Fields are required",
            });
        }
        // generate the jwt token
        const user = await prisma_1.prisma.user.findUnique({
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
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
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
        const token = jsonwebtoken_1.default.sign(Payload, JWT_SECRET, {
            expiresIn: "3d",
        });
        // we want to remove password from the user and then send to the response
        //user.password = undefined;
        // send the response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err,
        });
    }
};
exports.login = login;
