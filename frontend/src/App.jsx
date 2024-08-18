import { useState,useEffect } from 'react'
import { Route,Routes, useLocation,useNavigate } from 'react-router-dom';

// import './App.css'
import React from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import TaskDetails from './pages/TaskDetails';
// import Activity from './pages/Activity';
import './styles/tailwind.css';
import UsersDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskList from './pages/TasksList';
import AddTaskCard from './components/AddTaskCard';
import { useToast } from "@/components/ui/use-toast"


import {getTasks,taskListByConditions} from './services/task'
import {whatRole} from './services/user'
import {logout} from './services/auth'



export default function App() {
  const navigate=useNavigate()
  const { toast } = useToast()
  
  const exp="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlaGlsYSIsImVtYWlsIjoidGVoaWxhQGdtYWlsLmNvbSIsImltYWdlIjpudWxsLCJyb2xlIjoiYWRtaW4iLCJfaWQiOiI2NmJiMjQ5ZDcxOWMxNWU3YjUzMDNmNmYiLCJpYXQiOjE3MjM3MTk3NjgsImV4cCI6MTcyMzcxOTc2OX0.DQTn3BWpIPR7tpPPO4IAhCFfQyC6OeUZW8-C5b13Rzw"
  
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'): "")

  const [showAddTodo, setCount] = useState(false)
  const [allTasks,setTasks]=useState([])
  const [noTasks, setNoTasks] = useState(false)
  const [renderTask,setRenderTask]=useState(0)
  const [role,setRole]=useState(localStorage.getItem('role')?localStorage.getItem('role'):"gest")

  function logOut() {
    console.log("123");
    setToken("")
    setRole("gest")
    logout()
    setNoTasks('There are no tasks');
    setTasks([])
    navigate('/')
  }
  function logIn(newToken,userRole) {
    setToken(newToken)
    setRole(userRole)
    navigate('/')
  }

  useEffect(() =>{

    (async function(){
      if (token){
      let res= await getTasks(token)
      if(!res.data.auth){
        
        if(res.data.msg.message=="invalid token" || res.data.msg.message=="jwt malformed"){
          return "not a user"
        }
        if(res.data.msg.message=="jwt expired"){
          localStorage.removeItem("role")
          setRole("gest")
          toast({
            variant: "destructive",
            title: "Connection timed out please reconnect ",
            // description: "Login time has been expired, please login",        
          })
          navigate("/login")
          return res.data.msg
        }
      }
      
      if(res.data.msg){
        
          setNoTasks(false)
          let newArr=res.data.msg.filter(el=>{return el.isPinned} )
          
          let newArr2=res.data.msg.filter(el=>{return !el.isPinned} )

          setTasks(newArr.concat(newArr2))
      }else{
          setNoTasks('There are no tasks');
          setTasks([])
      }
    }

  })()
  
  },[token])

  return (
    <div className="static">
      {showAddTodo&&<AddTaskCard cancel={setCount}/>}
      <Navbar setRenderTask={setRenderTask}/>
      <button onClick={logOut} > logout</button>
      <Routes>
        <Route   path={`/`} element={<Home/>}/>
        <Route   path={`/taskList`} element={role==="gest"?<h1>users only</h1>:
          <div style={{display: "flex" ,justifyContent: "space-between", alignItems: "flex-start"}} 
            className='test flax items-center justify-between'>
            <Sidebar setCount={setCount} setTasks={setTasks} setNoTasks={setNoTasks}/>
            <div>
              <TaskList allTasks={allTasks} noTasks={noTasks}/>
            </div>
          </div> }/>
          
       
        <Route   path={`/userList`} element={role==='admin'?<UsersDetails/>:<h1>admin only</h1>}/>
        <Route   path={`/login`} element={role==="gest"?<Login logIn={logIn}/>:<Home/>}/>
        <Route   path={`/Register`} element={role==="user"?<Home/>:<Register login={logIn}/>}/>
        <Route   path={`*`} element={<Home/>}/>


      </Routes>

    </div>
  )
}
