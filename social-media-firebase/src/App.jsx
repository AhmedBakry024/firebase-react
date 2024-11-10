import { useState } from 'react'
import './App.css'
// import { db } from './connection'
import Form from './pages/form'
import View from './pages/view'
import { Routes, Route, BrowserRouter } from 'react-router-dom'




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
