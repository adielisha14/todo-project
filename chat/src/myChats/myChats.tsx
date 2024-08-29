import React, { useEffect, useState, useCallback } from 'react';
import { chatState } from '../context/chatProvider';
import axios from 'axios';
import GroupChatModel from '../GroupChatModel/GroupChatModel';
import SingleChat from '../SingleChat/SingleChat';
import { getSender } from '../config/chatLogics';
import { io, Socket } from 'socket.io-client';

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token?: string;
}

interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage?: Message;
}

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    pic: string;
  };
  chat: Chat;
}

interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const ENDPOINT = "http://localhost:5002";

let socket: Socket | undefined;
let selectedChatCompare: Chat | null = null;

const MyChats: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const { selectedChat, setSelectedChat, chats, setChats, user } = chatState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get<Message[]>(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      socket?.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error(error);
    }
  }, [selectedChat, user]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat, fetchMessages]);

  useEffect(() => {
    if (!socket) return;

    const messageListener = (newMessageReceived: Message) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        alert('u got a message!!!')
      } else {
        setMessages(prevMessages => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on('message received', messageListener);

    return () => {
      socket?.off('message received', messageListener);
    };
  }, []);

  const fetchChats = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get<Chat[]>('/api/chat', config);
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  }, [user, setChats]);

  const sendMessage = useCallback(async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ((event.type === "keydown" && (event as React.KeyboardEvent).key === "Enter") || event.type === "click") {
      if (newMessage.trim() && socket && selectedChat) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          };
          setNewMessage("");

          const { data } = await axios.post<Message>('/api/message',
            {
              content: newMessage,
              chatId: selectedChat._id,
            },
            config
          );
          socket.emit('new message', data);
          setMessages(prevMessages => [...prevMessages, data]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [newMessage, socket, selectedChat, user]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setLoggedUser(JSON.parse(userInfo));
    }
    fetchChats();
  }, [fetchAgain, fetchChats]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: '#f5f5f5',
      padding: '5px',
    }}>
      {/* Chat header */}
      <div style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '8px',
        marginBottom: '10px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
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
      <div style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <SingleChat messages={messages as any} />
      </div>

      {/* Input area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
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