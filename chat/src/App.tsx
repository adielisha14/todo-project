// import { useState } from 'react';
import './App.css';
// import { chatState } from './context/chatProvider';
import SideBar from './sideBar/sideBar'; 
import ChatBox from './myChats/myChats';
import {  useEffect, useState } from "react";
// import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const App = () => {
  // const { user } = chatState();

  const [user, setUser] =useState(JSON.parse(localStorage.getItem("userInfo")||"null"))
  // const [selectedChat, setSelectedChat]=useState();
    // const [chats, setChats]=useState([])
    console.log(user);
    

    const navigate = useNavigate();

    const fetchData = async ()=>{
        try {
         const token = localStorage.getItem('token');
         console.log(token);
         
            
          const config = {
            baseURL:"http://localhost:3040/",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const res= await axios.get(`/api/user/getUser`,
            config)
            console.log(res);
            if (res.data.status){

              setUser(res.data.msg)
            }
        } catch (error) {
          console.error(error);
          
        }
      }

    useEffect(()=>{
        fetchData()
        const userInfo = JSON.parse(localStorage.getItem("userInfo")||"null");
        setUser(userInfo)
        if (!userInfo) {
            navigate('/')
        }
    },[navigate])

  const [fetchAgain, setFetchAgain]=useState(false)
  return (
    <>
      <div style={{ border: "solid", height: "50vh", width: "50vw",display:"flex",justifyContent:"space-between",padding:"10px" }}>
        {/* { user&&<> */}
          <SideBar/>
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
          {/* </>} */}
      </div>
    </>
  );
};

export default App;
