
console.log("Profile routes loaded");

import express from "express";
import {editProfile, getProfile,uploadProfileImage} from "../controllers/Profile.controller";

import {upload} from "../middleware/upload.middleware"; // middleware for the upload

const router = express.Router();

router.get("/:userId", getProfile);
router.post("/:userId/upload-profile-image", 
upload.single("profileImage"), uploadProfileImage);

// edit Profile
router.put("/edit/:userId",editProfile);

export default router;