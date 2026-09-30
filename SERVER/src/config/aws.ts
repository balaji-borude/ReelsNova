import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.AWS_ENDPOINT_URL;
const region = process.env.AWS_REGION || "us-east-1";

console.log("AWS Region:", region);
if (endpoint) {
  console.log("AWS Endpoint (Floci/local):", endpoint);
}

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
  // Required for Floci / LocalStack path-style URLs
  ...(endpoint
    ? {
        endpoint,
        forcePathStyle: true,
      }
    : {}),
});
