import { useState,useEffect } from 'react'
import { Route,Routes, useLocation } from 'react-router-dom';

// import './App.css'
import React from 'react';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import TaskDetails from './pages/TaskDetails';
// import Activity from './pages/Activity';
import './styles/tailwind.css';
import UsersDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskList from './pages/TasksList';
import AddTaskCard from './components/AddTaskCard';

import {getTasks,taskListByConditions} from './services/task'



export default function App() {
  
  const userId='66b21e119e04a25c9d5bab37'
  const [count, setCount] = useState(false)
  const [allTasks,setTasks]=useState([])
  
  const [noTasks, setNoTasks] = useState(false)

  async function getData(){
    let res= await getTasks(userId)
  
    if(res){
        setNoTasks(false)
        let newArr=res.filter(el=>{return el.isPinned} )
        
        let newArr2=res.filter(el=>{return !el.isPinned} )

        setTasks(newArr.concat(newArr2))
    }else{
        setNoTasks('There are no tasks');
        setTasks([])

    }

}


useEffect(() =>{getData()},[])

  return (
    <div className="static">
      {count&&<AddTaskCard cancel={setCount}/>}
      <Navbar/>
      <Routes>
      <Route   path={`/`} element={<h1>home page</h1>}/>
      <Route   path={`/taskList`} element={
        <div style={{display: "flex" ,justifyContent: "space-between", alignItems: "flex-start"}} 
        className='test flax items-center justify-between'>
          <Sidebar setCount={setCount} setTasks={setTasks} setNoTasks={setNoTasks}/>
          <div>
            <TaskList allTasks={allTasks} noTasks={noTasks}/>
            
          </div>
        </div>
      }/>
      <Route   path={`/userList`} element={<UsersDetails/>}/>
      <Route   path={`/login`} element={"log"}/>
      <Route   path={`/Register`} element={"log"}/>

      </Routes>

    </div>
  )
}
