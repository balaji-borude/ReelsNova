import "dotenv/config";
import fs from "fs";
import path from "path";
import { prisma } from "../config/prisma";
import { uploadFileToS3 } from "../services/s3.service";
import { updateProfileImage } from "../services/profile.service";

async function main() {
  const user = await prisma.users.findFirst({
    select: { id: true, username: true, profileImage: true },
  });

  if (!user) {
    throw new Error("No users found in DB. Sign up once, then re-run.");
  }

  console.log("Using user:", user);

  const buffer = fs.readFileSync(
    path.join(__dirname, "fixtures", "tiny.png"),
  );

  const file = {
    fieldname: "profileImage",
    originalname: "tiny.png",
    encoding: "7bit",
    mimetype: "image/png",
    size: buffer.length,
    buffer,
  } as Express.Multer.File;

  const imageUrl = await uploadFileToS3(file, "profile-images");
  console.log("Uploaded to:", imageUrl);

  const updated = await updateProfileImage(user.id, imageUrl);
  console.log("DB updated:", updated);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
