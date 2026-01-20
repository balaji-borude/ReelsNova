import { request } from "http";
import express ,{Request,Response} from 'express';
import { prisma } from "./config/prisma";

import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, World!');
}); 

// import Routes
import authRoutes from './routes/auth';

// auth routes
app.use("/api/v1/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});