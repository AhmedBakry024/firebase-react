import { useState } from 'react'
import './App.css'
// import { db } from './connection'
import Form from './pages/form'
import View from './pages/view'
import  Notification  from './pages/notification'

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'




function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/view" element={<View />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
