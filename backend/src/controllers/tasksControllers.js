import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate
  switch(filter){
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
      }
  }
  const query = startDate ? { createdAt: { $gte: startDate } } : {};
    try {
      const result = await Task.aggregate([
        {
          $match:query
        },
        {
          $facet: {
            task: [{ $sort: { createdAt: -1 } }],
            activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
            completeCount:[{$match:{status: "complete"}}, {$count: "count"}]
          }
        }
      ])
      const tasks = result[0].task;
      const activeCount = result[0].activeCount[0]?.count || 0;
      const completeCount = result[0].completeCount[0]?.count || 0 ;
      res.status(200).json({tasks, activeCount, completeCount});
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
      const { title, status, completedAt } = req.body;
      const updateTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, status, completedAt },
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