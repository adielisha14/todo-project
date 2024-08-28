import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext<any>(null);

const ChatProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] =useState<string>()
    const [selectedChat, setSelectedChat]=useState();
    const [chats, setChats]=useState([])

    const navigate = useNavigate();

    useEffect(()=>{
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
