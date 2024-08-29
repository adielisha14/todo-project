import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ChatContext = createContext<any>(null);

const ChatProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] =useState<string>()
    const [selectedChat, setSelectedChat]=useState();
    const [chats, setChats]=useState([])

    const navigate = useNavigate();

    const fetchData = async ()=>{
        try {
         const token = localStorage.getItem('token');
            
          const config = {
            baseURL:"http://localhost:3040/",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const res= await axios.get(`/api/user/getUser`,
            config)
            console.log(res);
            
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

    return (
        <ChatContext.Provider value={{user, setUser,selectedChat, setSelectedChat,chats, setChats}}>
            {children}
        </ChatContext.Provider>
    );
};

export const chatState = ()=>{
   return useContext(ChatContext)
}

export default ChatProvider;



// const getUser=async()=>{
//     try {
//         const response= await axios.get('/api/user/getUser')
//         return response
//     } catch (error) {
//         console.log(error);
//         return error
//     }
//  }
