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

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username,email , password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
       email,

      }
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});