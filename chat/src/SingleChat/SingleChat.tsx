import React from 'react';
// import { chatState } from '../context/chatProvider';
// import { json } from 'react-router-dom';


interface SingleChatProps {
  messages: Array<{
    _id: string;
    content: string;
    sender: {
      _id: string;
      name: string;
      pic: string;
    };
    chat: {
      _id: string;
      chatName: string;
      isGroupChat: boolean;
      users: Array<{
        _id: string;
        name: string;
        email: string;
      }>;
      latestMessage: {
        content: string;
      };
    };
  }>;
}

const SingleChat: React.FC<SingleChatProps> = ({ messages }) => {
  // const { user } = chatState();
  // const user ={email
  //   : 
  //   "tehilamoyal0@gmail.com",
  //   password
  //   : 
  //   "$2b$10$L5f.W3XUIOf1WSYwSMWSEeOSB/ZAbT2vK.C004hMaCIg7Hqy4Ju3S",
  //   role
  //   : 
  //   "user",
  //   updatedAt
  //   : 
  //   "2024-08-28T16:07:00.566Z",
  //   username
  //   : 
  //   "tehila123",
  //   __v
  //   : 
  //   0,
  //   _id
  //   : 
  //   "66cc6947f29aa910a2516579"}
  const user=JSON.parse(localStorage.getItem("userInfo")||"null")

  

  return (
    <div>
      {messages && messages.map((m) => (
        <div
          key={m._id}
          style={{
            backgroundColor: `${m.sender._id === user?._id ? '#007bff' : '#B9F5D0'}`,
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '8px',
            marginBottom: '10px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {m.content}
        </div>
      ))}
    </div>
  );
}

export default SingleChat;