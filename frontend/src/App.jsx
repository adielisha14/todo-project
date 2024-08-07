// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from 'react';
import Home from './pages/Home';
import Sidebar from './components/Sidebar/Sidebar';
import { Button } from "@/components/ui/button"

import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import TasksList from './pages/TasksList';
// import TaskDetails from './pages/TaskDetails';
// import Activity from './pages/Activity';
import './styles/tailwind.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
  <Navbar></Navbar>
  <Sidebar/>
  </>
  )
}

export default App
