import AddTask from '@/components/AddTask'
import Header from '@/components/header'
import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] relative">
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
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          <Header />
          <AddTask />
        </div>
      </div>
    </div>

  )
}

export default HomePage
