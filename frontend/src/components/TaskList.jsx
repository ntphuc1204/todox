import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = () => {
    let filter = "all";
    const fiterTasks = [
        {
            id: '1',
            title: 'Hoc react',
            completedAt: null,
            createdAt: new Date(),
        },
        {
            id: '2',
            title: 'Hoc js',
            completedAt: null,
            createdAt: new Date(),
        }
    ];
    if(!fiterTasks || fiterTasks.length === 0) {
        return <TaskEmptyState filter={filter} />;
    }
  return (
    <div className="space-y-3">
          {
            fiterTasks.map((task,index) => (
                <TaskCard key={task.id ?? index} task={task} index={ index} />
            ))
      }
    </div>
  )
}

export default TaskList
