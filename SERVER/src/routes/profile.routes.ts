
console.log("Profile routes loaded");

import express from "express";
import {editProfile, getProfile,uploadProfileImage} from "../controllers/Profile.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

import {upload} from "../middleware/upload.middleware"; // middleware for the upload

const router = express.Router();

router.get("/:userId",AuthMiddleware, getProfile);
router.post("/:userId/upload-profile-image", 
upload.single("profileImage"),AuthMiddleware, uploadProfileImage);

// edit Profile
router.put("/edit/:userId",AuthMiddleware, editProfile);

export default router;