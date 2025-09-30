import express from "express"
import { isAuth } from "../middlewares/isAuth.js"
import { createTask, deleteTask, getTasks, updateTasks } from "../controllers/task.controller.js"

const taskRouter = express.Router()

taskRouter.post("/create",isAuth,createTask)
taskRouter.get("/",isAuth,getTasks)
taskRouter.put("/:id",isAuth,updateTasks)
taskRouter.delete("/:id",isAuth,deleteTask)

export default taskRouter