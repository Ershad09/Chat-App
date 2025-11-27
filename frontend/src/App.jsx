import React from 'react'
import { Route, Routes } from 'react-router'
import './app.css'
import ChatPage from './pages/ChatPage/ChatPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx'

function App() {
  return (
    <div className='app-bg'>
    <Routes> 
      <Route path='/' element= { <ChatPage />} />
      <Route path='/login' element= { <LoginPage />} />
      <Route path='/signup' element= { <SignUpPage />} />
    </Routes>
    </div>
  )
}

export default App