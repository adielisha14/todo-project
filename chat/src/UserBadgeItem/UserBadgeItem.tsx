import React from 'react';


interface User {
  _id: string;
  name: string;
}

interface UserBadgeItemProps {
  user: User;
  handleFunction: () => void;
}

const UserBadgeItem: React.FC<UserBadgeItemProps> = ({ user, handleFunction }) => {
  return (
    <div style={badgeStyles}>
      <span style={nameStyles}>{user.name} X</span>
      <button onClick={handleFunction} style={buttonStyles}>

      </button>
    </div>
  );
};

const badgeStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  borderRadius: '15px',
  backgroundColor: '#e0e0e0',
  margin: '5px',
};

const nameStyles: React.CSSProperties = {
  marginRight: '10px',
};

const buttonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#888',
};

export default UserBadgeItem;
