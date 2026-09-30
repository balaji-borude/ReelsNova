import {
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../config/aws";
import { v4 as uuid } from "uuid";

const getPublicObjectUrl = (key: string): string => {
  const bucket = process.env.AWS_BUCKET_NAME!;
  const region = process.env.AWS_REGION || "us-east-1";
  const endpoint = process.env.AWS_ENDPOINT_URL;

  // Floci / local emulator — path-style URL
  if (endpoint) {
    return `${endpoint.replace(/\/$/, "")}/${bucket}/${key}`;
  }

  // Real AWS S3
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  folder: string,
): Promise<string> => {
  const extension = file.originalname.split(".").pop();
  const fileName = `${folder}/${uuid()}.${extension}`;

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(params));

  return getPublicObjectUrl(fileName);
};
