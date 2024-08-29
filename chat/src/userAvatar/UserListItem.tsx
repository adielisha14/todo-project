import React from 'react';

interface User {
    _id: string;
    name: string;
    image: string;  
    email: string;  
  }
  

interface UserListItemProps {
  user: User;
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, handleFunction }) => {
  return (
    <>
     <div onClick={handleFunction}
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        width: '200px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: '10px'
      }}
    >
      <img
        src={user.image}
        alt={user.name}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: '10px'
        }}
      />
      <div style={{ flex: 1 }}>
        <h3
          style={{
            margin: '0',
            fontSize: '16px',
            color: '#333'
          }}
        >
          {user.name}
        </h3>
        <p
          style={{
            margin: '0',
            fontSize: '14px',
            color: '#555'
          }}
        >
          {user.email}
        </p>
      </div>
    </div>
    </>
  );
};

export default UserListItem;

