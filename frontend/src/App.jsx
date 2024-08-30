import { useState,useEffect } from 'react'
import { Route,Routes, useLocation,useNavigate, Link } from 'react-router-dom';
import { Suspense } from 'react';
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
import Forgot from './pages/Forgot';
import ResetPassword from './components/ResetPassword';
import { useToast } from "@/components/ui/use-toast"
import UserProfile from './pages/Profile/UserProfile';


// import { AuthProvider } from './contexts/Auth';
import SwitchTheme from './components/SwitchTheme';


import {getTasks,taskListByConditions} from './services/task'
import {whatRole} from './services/user'
import {logout} from './services/auth'
const Chat = React.lazy(() => import("chat/App"));



export default function App() {
  const navigate=useNavigate()
  const { toast } = useToast()

  const [showAddTodo, setCount] = useState(false)
  const [allTasks,setTasks]=useState([])
  const [noTasks, setNoTasks] = useState(false)
  const [renderTask,setRenderTask]=useState(0)
  const [role,setRole]=useState(localStorage.getItem('role')?localStorage.getItem('role'):"gest")

  function logOut() {
    console.log("123");
    setRole("gest")
    logout()
    setNoTasks('There are no tasks');
    setTasks([])
    navigate('/')
  }
  
  function logIn(userRole) {
    setRole(userRole)
    navigate('/')
  }

  useEffect(() =>{

    (async function(){
      if (localStorage.getItem('token')){
        let res= await getTasks()
        if(!res.data.auth){
          
          if(res.data.msg.message=="invalid token" || res.data.msg.message=="jwt malformed"){
            return "not a user"
          }
          if(res.data.msg.message=="jwt expired"){
            // localStorage.removeItem("role")
            // localStorage.removeItem("token")
            // setRole("gest")
            logOut()
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
  
  },[renderTask])

  return (
        




    <div className="static">
      <SwitchTheme />
      {showAddTodo&&<AddTaskCard cancel={setCount}/>}
      <Navbar setRenderTask={setRenderTask}/>
      <button onClick={logOut} > logout</button>

      <Suspense fallback={<>hi</>}>
        <Chat/>
      </Suspense>

      

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
        <Route   path={`/forgot`} element={<Forgot/>}/>
        <Route   path={`/ResetPassword/*`} element={<ResetPassword/>}/>
        <Route   path={`/login`} element={role==="gest"?<Login logIn={logIn}/>:<Home/>}/>
        <Route   path={`/Register`} element={role==="user"?<Home/>:<Register login={logIn}/>}/>
        <Route   path={`*`} element={<Home/>}/>
        <Route   path={`/profile`} element={role==="gest"?<Register login={logIn}/>:<UserProfile/>}/>
        <Route path="chat/*" element={     <Suspense fallback={<h1>noooo......</h1>}><Chat/></Suspense>} />


      </Routes>

    </div>
  )
}
