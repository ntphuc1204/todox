import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen text-center'>
          <img src='404_NotFound.png' alt='404 Not Found' className='w-1/3 mb-8' />
          <div className='text-2xl font-semibold mb-4'>Oops! Page Not Found</div>
          <div className='p-[0.8rem] px-[1.5rem] bg-blue-600 text-[#fff]  rounded-[2rem]'>
              <a href='/' > Back Home</a>
          </div>
    </div>
  )
}

export default NotFoundPage;
