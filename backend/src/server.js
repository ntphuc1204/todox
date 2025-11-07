import express from 'express';
import taskRouters from './routes/tasksRouters.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors'
import path from 'path'
dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

app.use(express.json());


if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));
}
app.use("/api/tasks", taskRouters);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
})
}


connectDB(() => {
    app.listen(PORT, () => { 
        console.log(`Server is running on ${PORT}`);
    });
    
});

