import express from 'express';
import taskRouters from './routes/tasksRouters.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors'
dotenv.config();
const PORT =  process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

app.use("/api/tasks", taskRouters);
connectDB(() => {
    app.listen(PORT, () => { 
        console.log(`Server is running on ${PORT}`);
    });
    
});

