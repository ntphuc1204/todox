import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const createTasks = async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  
      const newTask = new Task({ title });
      await newTask.save();
  
      return res.status(201).json(newTask);
  
    } catch (error) {
      console.warn("Error createtasks:", error);
      return res.status(500).json({ message: "Error creating task" });
    }
  };
export const updateTasks = async (req, res) => {
    try {
      const { title, status, completeAt } = req.body;
      const updateTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, status, completeAt },
        { new: true }
      );
      if (!updateTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(updateTask);
    } catch (error) {
      console.warn("Error updatetasks:", error);
      return res.status(500).json({ message: "Error updatetasks task" });
    }
};
export const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.warn("Error deletetasks:", error);
    return res.status(500).json({ message: "Error deletetasks task" });
  }
};