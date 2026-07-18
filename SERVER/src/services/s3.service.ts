import {
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../config/aws";
import { v4 as uuid } from "uuid";

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  folder: string
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

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

