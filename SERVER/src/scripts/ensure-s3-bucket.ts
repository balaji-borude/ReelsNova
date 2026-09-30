/**
 * One-time helper: creates the S3 bucket on Floci if it does not exist.
 * Run from SERVER/: npx ts-node src/scripts/ensure-s3-bucket.ts
 */
import "dotenv/config";
import {
  CreateBucketCommand,
  HeadBucketCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const bucket = process.env.AWS_BUCKET_NAME || "reelsnova";
const endpoint = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";
const region = process.env.AWS_REGION || "us-east-1";

const client = new S3Client({
  region,
  endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
});

async function main() {
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`Bucket already exists: ${bucket}`);
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
    console.log(`Created bucket: ${bucket}`);
  }

  console.log(`Endpoint: ${endpoint}`);
  console.log(`Ready. Upload path example: ${endpoint}/${bucket}/profile-images/...`);
}

main().catch((err) => {
  console.error("Failed to ensure bucket:", err);
  process.exit(1);
});
