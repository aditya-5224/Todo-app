import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes.js'; 
import { connectDB } from './config/db.js';

dotenv.config(); 


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port http://localhost:5000');
});
