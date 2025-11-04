import React from 'react'
import { Card } from './ui/card.jsx'
import { Input } from './ui/input.jsx'
import { Button } from './ui/button.jsx'
import { Plus } from 'lucide-react'
import TaskAndFilter from './TaskAndFilter.jsx'
function AddTask() {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
          type="text"
          placeholder="Add a new task..."
          className="h-12 text-base "
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
      <TaskAndFilter />
    </Card>
  )
}

export default AddTask
