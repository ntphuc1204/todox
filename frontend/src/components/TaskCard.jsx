import React, { useState } from 'react'
import { Card } from './ui/card'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle,setUpdateTaskTitle]= useState(task.title || "")
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`);
      toast.success("delete Task complete")
      handleTaskChanged();
    } catch (error) {
      console.error("delete task error", error);
        toast.error("delete  task error");
    }
  }
  const updateTask = async () => {
    try {
      setIsEditing(false);
      await axios.put(`http://localhost:5001/api/tasks/${task._id}`, {
        title: updateTaskTitle
      });
      toast.success(`update to ${updateTaskTitle}`)
      handleTaskChanged();
    } catch (error) {
      console.error("update task error", error);
        toast.error("update  task error");
    }
  }
  const tongleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await axios.put(`http://localhost:5001/api/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        toast.success(`change task to complete`)
      } else {
        await axios.put(`http://localhost:5001/api/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`change task to active`)
      }
      handleTaskChanged();
    } catch (error) {
      console.error("change status task error", error);
        toast.error("change status task error")
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  }
  return (
    <Card
      className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === 'completed' && 'opacity-75')}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4'>
        <Button
          variant="ghost"
          size='icon'
          className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === 'complete'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={tongleTaskCompleteButton}
        >
          {task.status === 'complete'
            ?( <CheckCircle2 className='size-5' />)
            : (<Circle className='size-5' />)}
        </Button>

        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              placeholder="Edit task..."
              className='flex-1 -12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type='text'
              value={updateTaskTitle}
              onChange={(even) => setUpdateTaskTitle(even.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "")
              }}
          />
          ) : (
            <p
              className={cn("text-base transition-all duration-200 ",
                task.status === 'completed'
                  ? "line-through text-muted-foreground"
                  : "text-foreground")}
            >
              {task.title}
            </p>
          )}
          <div className='flex items-center gap-2 mt-1'>
          <Calendar className='size-3 text-muted-foreground' />
          <span className='text-xs text-muted-foreground'>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          {task.completedAt && (
            <>
              <span className='text-xs text-muted-foreground'>-</span>
              <Calendar className='size-3 text-muted-foreground' />
              <span className='text-xs text-muted-foreground'>
                {new Date(task.completedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>
        </div>
        
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          <Button
            variant="ghost"
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "")
            }}
          >
            <SquarePen className='size-4' />
          </Button>
          <Button
            variant="ghost"
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
            onClick={()=>deleteTask(task._id)}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>
    </div>
    </Card>
  )
}

export default TaskCard
