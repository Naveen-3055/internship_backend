import Task from "../models/task.model.js"
import logger from "../config/logger.js";
export const createTask = async (req,res)=>{
    try {
        const {title,description} = req.body 
         
        if(!title){
            logger.warn(`Task creation failed: Missing title (User: ${req.userId})`);
            res.status(400).json({Message:`title is required`})
        }
        const task = await Task.create({
            user: req.userId,
            title,
            description

        })
          logger.info(`Task created (User: ${req.userId}, TaskID: ${task._id}, Title: ${title})`);
        return res.status(201).json(task);
    } catch (error) {
       logger.error(`Task creation error (User: ${req.userId}) - ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: `Create task error: ${error.message}` });
    }
}

export const getTasks = async (req,res)=>{
    try {
        const {search, status} = req.query

        let query = {user : req.userId}

        if(search){
            query.title = {$regex : search, $options:"i"}
           
        }
        if (status) query.status = status;
        const tasks = await Task.find(query).sort({ createdAt: -1 });
       
          return res.status(200).json(tasks);
    } catch (error) {
       
        return res.status(500).json({ message: `Get tasks error: ${error.message}` });
    }
}

export const updateTasks = async (req,res)=>{
    try {
        const taskId = req.params.id 
        const {title,description, status} = req.body
        const updateData = {}
        
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (status) updateData.status = status;
        const task = await Task.findOneAndUpdate({_id:taskId,user:req.userId},{$set: updateData},{new:true})

        if(!task){
            res.status(400).json({ message: "Task not found" });
        }
      
         return res.status(200).json(task);
    } catch (error) {
        
         return res.status(500).json({ message: `Update task error: ${error.message}` });
    }
}

export const deleteTask = async (req,res)=>{
    try {
        const taskId = req.params.id 
        const task = await Task.findOneAndDelete({_id:taskId, user : req.userId}
        )
        if(!task){
             return res.status(404).json({ message: "Task not found" });
        }
       
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
           
        return res.status(500).json({ message: `Delete task error: ${error.message}` });
    }
}