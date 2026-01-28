
import express ,{Request,Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// enable CORS    
const URL = process.env.DATABASE_URL
console.log("db uRl-->",URL);

const app = express();
const PORT = process.env.PORT ||4000;
app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, World!');
}); 

// import Routes
import authRoutes from './routes/auth';

// auth routes
app.use("/api/v1/auth", authRoutes);


app.get('/health', (req:Request, res:Response) => {
  res.status(200).json({ success:true, message: 'Server is healthy' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});