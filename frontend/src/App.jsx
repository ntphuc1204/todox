import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { BrowserRouter, Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFound';
function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
