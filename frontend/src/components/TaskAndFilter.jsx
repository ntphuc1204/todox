import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'
import { FilterOptions } from '@/lib/data'

function TaskAndFilter({completedTasksCount = 0, activeTasksCount = 0, filter="all"}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className='flex gap-3'>
              <Badge
                  variant="secondary"
                  className="bg-white/50 text-accent-foreground border-info/50"
              >
                  {activeTasksCount} {FilterOptions.active}
              </Badge>
              <Badge
                  variant="secondary"
                  className="bg-white/50 text-success border-info/50"
              >
                  {completedTasksCount} {FilterOptions.completed}
              </Badge>
        </div>
        
        <div className='flex flex-col gap-2 sm:flex-row'>
              {
                Object.keys(FilterOptions).map((type) => (
                    <Button
                        key={type}
                        gradient={filter === type ? "gradient" : "ghost"}
                        size="sm"
                        className="capitalize"
                    >
                        <Filter className='size-4' />
                        {FilterOptions[type]}
                    </Button>
                ))  
              }
        </div>
    </div>
  )
}

export default TaskAndFilter
