import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// enable CORS
const URL = process.env.DATABASE_URL;
console.log("db uRl-->", URL);
console.log("AWS Region:", process.env.AWS_REGION);
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Reels Nova Server is running1");
});

// import Routes
import authRoutes from "./routes/authroutes";
import profileRoutes from './routes/profile.routes';

// auth routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
