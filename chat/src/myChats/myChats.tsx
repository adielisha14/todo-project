import React, { useEffect, useState } from 'react';
import { chatState } from '../context/chatProvider';
import axios from 'axios';
import GroupChatModel from '../GroupChatModel/GroupChatModel';
import SingleChat from '../SingleChat/SingleChat';
import { getSender } from '../config/chatLogics';

interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

  const MyChats: React.FC<ChatBoxProps> = ({ fetchAgain }) => {
    // const MyChats: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  // const { selectedChat, setChats, user, setSelectedChat, chats} = chatState();
  const { selectedChat, setChats, user} = chatState();
 console.log(loggedUser);
 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchMessages = async ()=>{
    if (!selectedChat) {return}
    try {
      const config = {
        baseURL:"http://localhost:3040/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")||"null"}`,
        },
      };
      const res= await axios.get(`/api/message/${selectedChat._id}`,
        config)
        setMessages(res?.data)
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(()=>{
    fetchMessages();
  },[selectedChat]);
  
  const fetchChats = async () => {
    try {
      const config = {
        baseURL:"http://localhost:3040/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")||"null"}`,
        },
      };
      const res = await axios.get('/api/chat', config);
      console.log(res?.data);
      setChats(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ((event.type === "keydown" && (event as React.KeyboardEvent).key === "Enter") || event.type === "click") {
      if (newMessage.trim()) {
        try {
          const config = {
            
        baseURL:"http://localhost:3040/",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")||"null"}`,
            },
          };
          setNewMessage("");

          const { data } = await axios.post('/api/message',
            {
              content: newMessage,
              chatId: selectedChat._id,
            },
            config
          );
          setMessages([...messages, data]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setLoggedUser(JSON.parse(userInfo));
    }
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '5px',
      }}
    >
      {/* Chat header */}
      <div
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '8px',
          marginBottom: '10px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={handleOpenModal}>Create Group</button>

        <GroupChatModel isOpen={isModalOpen} onClose={handleCloseModal} />

        {!selectedChat ? (
        <>No Chat Selected</>
      ) : !selectedChat.isGroupChat ? (
        <>{getSender(user, selectedChat.users) || "No Sender"}</>
      ) : (
        <>{selectedChat.chatName?.toUpperCase() || "Chat Name"}</>
      )}
      </div>

      {/* Chat messages container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        
        <SingleChat messages={messages} />
      </div>

      {/* Input area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={sendMessage}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginRight: '10px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MyChats;
