import AddTask from '@/components/AddTask'
import Footer from '@/components/footer'
import Header from '@/components/header'
import TaskAndFilter from '@/components/TaskAndFilter'
import TaskList from '@/components/TaskList'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import DateTimeFilter from '@/components/DateTimeFilter'
import TaskListPagination from '@/components/TaskListPagination'
import { visibleTaskLimit } from '@/lib/data'
import api from '@/lib/axios'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchTasks();
  }, [dateQuery])
  useEffect(() => {
    setPage(1);
  },[filter,dateQuery])
  const fetchTasks = async () => { 
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setCompleteCount(res.data.completeCount);
      setActiveCount(res.data.activeCount);
      console.log(res.data)
    } catch (error) {
      console.error(error);
      toast.error("error accessing tasks")
    }
  }
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev)=> prev + 1)
    }
  }
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev)=> prev - 1)
    }
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  })
  const handleTaskChanged = () => {
    fetchTasks();
  }
  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  if (visibleTask.length === 0) {
    handlePrev();
  }
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  return (
    <div className="min-h-screen w-full bg-[#b3b39c] relative">
      {/* Diagonal Fade Center Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6 sm:p-0'>
          <Header />
          <AddTask handleNewTaskTitle={ handleTaskChanged } />
          <TaskAndFilter
            filter={filter}
            setFilter={setFilter}
            completedTasksCount={completeCount}
            activeTasksCount={activeCount} />
          <TaskList filterTasks={visibleTask} filter={filter} handleTaskChanged={handleTaskChanged} />
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
              />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={ setDateQuery} />
          </div>
          
          <Footer completedTaskCount={completeCount} activeTaskCount={activeCount}/>
        </div>
      </div>
    </div>

  )
}

export default HomePage
