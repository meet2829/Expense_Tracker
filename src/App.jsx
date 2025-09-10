import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Expenses from './pages/Expenses'
import Navbar from './components/Navbar'
import Reports from './pages/Reports'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/expenses' element={<Expenses />}/>
        <Route path='/report' element={<Reports />}/>
      </Routes>
     </>
  )
}

export default App
