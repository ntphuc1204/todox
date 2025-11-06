import  { useState } from 'react'
import { Card } from './ui/card.jsx'
import { Input } from './ui/input.jsx'
import { Button } from './ui/button.jsx'
import { Plus } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const AddTask = ({ handleNewTaskTitle })=> {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await axios.post("http://localhost:5001/api/tasks", { title: newTaskTitle });
        toast.success(`create complete Task ${newTaskTitle}`);
        handleNewTaskTitle();
      } catch (error) {
        console.error("create task error", error);
        toast.error("create task error");
      }
      setNewTaskTitle("");
    } else {
      toast.error("you need to enter")
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
          type="text"
          placeholder="Add a new task..."
          className="h-12 text-base "
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
      
    </Card>
  )
}

export default AddTask
