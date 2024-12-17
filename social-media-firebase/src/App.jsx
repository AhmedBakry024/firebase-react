import { useState } from 'react'
import './App.css'
// import { db } from './connection'
import Form from './pages/form'
import View from './pages/view'
import  Topic  from './pages/topic'
import Notification from './pages/notification'

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}



function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/view" element={<View />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
