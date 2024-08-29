import React from 'react';
import { chatState } from '../context/chatProvider';


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
  const { user } = chatState();

  return (
    <div>
      {messages && messages.map((m, i) => (
        <div
          key={m._id}
          style={{
            backgroundColor: `${m.sender._id === user._id ? '#007bff' : '#B9F5D0'}`,
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
