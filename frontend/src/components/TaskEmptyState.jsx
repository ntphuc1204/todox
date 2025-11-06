import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
      className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >
      <div className='space-y-3'>
        <Circle className='mx-auto size-12 text-muted-foreground' />
        <div>
          <h3 className='font-medium text-foreground'>
            {
              filter === 'active' ?
                "No active tasks found" :
              filter === 'completed' ?
                "No completed tasks found" :
                "No tasks found"
            }
          </h3>
          <p className='text-sm text-muted-foreground'>
            {
              filter === 'all' ? "Create tasks to get started" :
              `Try adjusting your filter to find more tasks ${ filter === 'active' ? "to complete" : "that are completed" }.`
            }
          </p>
        </div>

      </div>

    </Card>
  )
}

export default TaskEmptyState
