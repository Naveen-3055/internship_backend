import express from 'express'
import connectDb from './db.js'
import dotenv from  "dotenv"
import logger from './config/logger.js'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import profileRouter from './routes/profile.routes.js'
import taskRouter from './routes/task.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL ,
  credentials:true
}))

app.use(express.json())
app.use(cookieParser())
logger.info("Server starting on port 8000");
logger.error("DB connection failed");
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/auth",authRouter)
app.use("/api/profile",profileRouter)
app.use("/api/tasks",taskRouter)
const port = process.env.PORT || 5000
app.listen(port,()=>{
    connectDb()
    console.log("server connected")
})