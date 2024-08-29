// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { chatState } from '../context/chatProvider';
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';
import { getSender } from '../config/chatLogics';

interface User {
  _id: string;
  name: string;
  image: string;
  email: string;
  token?: string;
}

interface Chat {
  _id?: string;
  name: string;
  chatName: string;
  isGroupChat: boolean;
  users: any;
}



const SideBar:  React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);


  const config = {
    baseURL:"http://localhost:3040/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")||"null"}`,
    },
  };
  useEffect(() => {
    setLoggedUser(user);
  }, [user]);

  const handleSearch = async () => {
    try {

      const res = await axios.get<User[]>(`/api/user/search?search=${search}`, config);
      setSearchResult(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  const accessChat = async (userId: string) => {
    try {

      const res = await axios.post('/api/chat', { userId }, config);
      if (!chats.find((c: any) => c._id === res?.data._id)) setChats([res?.data, ...chats]);

      setSelectedChat(res?.data);
      setSearchResult([]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          style={{ padding: '8px', width: 'calc(60% - 50px)', marginRight: '10px' }}
          placeholder={'Search for users'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {searchResult.length > 0 && (
        <div style={{ borderTop: '1px solid #c2c', paddingTop: '10px' }}>
          {searchResult.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              // handleFunction={() => (console.log("123"))}
              handleFunction={() => accessChat(user._id)}
            />
          ))}
        </div>
      )}

      {chats && (
        <div style={{ overflowY: "scroll", width: '90%', height: "85%", border: "solid grey" }}>
          {chats.map((chat: Chat) => (
            <div
              onClick={() => setSelectedChat(chat)}
              style={{
                cursor: 'pointer',
                background: selectedChat === chat ? '#38B2AC' : "#E8E8E8",
                color: selectedChat === chat ? "white" : "black",
                padding: "12px"
              }}
              key={chat._id}
            >
              {!chat.isGroupChat
                ? loggedUser && getSender(loggedUser, chat.users)
                : chat.chatName
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
