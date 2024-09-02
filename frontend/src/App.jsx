import React from 'react';
import { useState,useEffect } from 'react'
import { Route,Routes, useLocation,useNavigate, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useToast } from "@/components/ui/use-toast"
import './styles/tailwind.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UsersDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskList from './pages/TasksList';
import AddTaskCard from './components/AddTaskCard';
import Forgot from './pages/Forgot';
import ResetPassword from './components/ResetPassword';
import UserProfile from './pages/Profile/UserProfile';
import Err from './pages/Err';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

// import { AuthProvider } from './contexts/Auth';
import SwitchTheme from './components/SwitchTheme';
import {getTasks,taskListByConditions} from './services/task'
import {whatRole} from './services/user'
import {logout} from './services/auth'
const Chat = React.lazy(() => import("chat/App"));
import timeimg from './assets/img/chat2.svg'



export default function App() {
  const navigate=useNavigate()
  const { toast } = useToast()

  const [showAddTodo, setCount] = useState(false)
  const [showChat, setChat] = useState(false)
  const [allTasks,setTasks]=useState([])
  const [noTasks, setNoTasks] = useState(false)
  const [renderTask,setRenderTask]=useState(0)
  const [role,setRole]=useState(localStorage.getItem('role')?localStorage.getItem('role'):"gest")

  function logOut() {
    console.log("logout");
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
      <Navbar setRenderTask={setRenderTask} role={role} logout={logOut}/>

      <Suspense fallback={<>loading.....</>}>
      {showChat&&<div style={{zIndex:1232,background:"white"}}  className=' absolute'>
        <Chat/>

      </div>}
      </Suspense>

  
      <>
        <div className="relative">
        <div className="fixed bottom-10 left-11 z-20 border border-primary/70 rounded p-1">
            <div
            className=" text-text bg-secondary/20 hover:bg-secondary/50 w-10 h-10 flex cursor-pointer justify-center items-center rounded p-1"
            onClick={()=>setChat(prev=>!prev)}>
           <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </div>

        </div>
        </div>
        </>

      

      <Routes>
      <Route   path={`/`} element={<Home/>}/>
        <Route   path={`/taskList`} element={role==="gest"?
          <Err access={"users"} nav={"Register"}/>:
          <div style={{display: "flex" ,justifyContent: "space-between", alignItems: "flex-start"}} 
            className='test flax items-center justify-between'>
            <Sidebar setCount={setCount} setTasks={setTasks} setNoTasks={setNoTasks}/>
            <div>
              <TaskList allTasks={allTasks} noTasks={noTasks}/>
            </div>
          </div> }/>
          
          
        <Route   path={`/userList`} element={role==='admin'?<UsersDetails/>:<Err access={"admins"} nav={"home"}/>}/>
        <Route   path={`/forgot`} element={<Forgot/>}/>
        <Route   path={`/ResetPassword/*`} element={<ResetPassword/>}/>
        <Route   path={`/login`} element={role==="gest"?<Login logIn={logIn}/>:<Home/>}/>
        <Route   path={`/Register`} element={role==="user"?<Home/>:<Register login={logIn}/>}/>
        <Route   path={`*`} element={<Home/>}/>
        <Route   path={`/profile`} element={role==="user"?<Err access={"users"} nav={"Register"}/>:<UserProfile/>}/>


      </Routes>

    </div>
  )
}
