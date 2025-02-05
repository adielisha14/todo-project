import React, { useState } from 'react';
import { chatState } from '../context/chatProvider';
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';
import UserBadgeItem from '../UserBadgeItem/UserBadgeItem';

interface GroupChatModelProps {
  isOpen: boolean;
  onClose: () => void;
  
}
interface User {
    _id: string;
    name: string;
    image: string;  
    email: string;  
}

const GroupChatModel: React.FC<GroupChatModelProps> = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState<string | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchtxt, setSearchtxt]=useState('');
  const [search, setSearch]=useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const config = {
    baseURL:"http://localhost:3040/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")||"null"}`,
    },
  };


    const {chats, setChats}=chatState()
    

    const handleSearch =async(query:string)=>{
        setSearch(query)
        if (!query) {return}
        try {
              const res=await axios.get(`/api/user/search?search=${search}`,config);
              setSearchResult(res?.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleGroup = async(userToAdd: User)=>{
        if (selectedUsers.includes(userToAdd)) {
            return alert('user already added')
        }
        setSelectedUsers([...selectedUsers,userToAdd])
    }

    const handleDelete = async(userToDelete: User)=>{
        setSelectedUsers(selectedUsers.filter(sel=>sel._id!==userToDelete._id))
    }

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupChatName||!selectedUsers) {
        alert('fill all the feilds please')
       return
    }
    try {
       
          const res= await axios.post('/api/chat/group',{
            name:groupChatName,
            users:JSON.stringify(selectedUsers.map((u)=>u._id))
          },config)
          setChats([res?.data, ...chats])
    } catch (error) {
     console.error(error);
     
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2 style={{color:"black"}}>Create Group Chat</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{color:"black"}}>Group Name:</label>
            <input style={{color:"black"}}
              type="text"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{color:"black"}}>Search Users:</label>
            <input style={{color:"black"}}
              type="text"
              onChange={(e) => {setSearchtxt(e.target.value)
                                handleSearch(e.target.value)}}
              value={searchtxt}
              // required
            />
            {selectedUsers.map((u) => (
            <UserBadgeItem 
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
            />
            ))}

            {searchResult?.slice(0, 4).map((user) => (
            <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
            />
            ))}

          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>

            <button  style={{ color:"black"}} type="button" onClick={onClose}>Close</button>
            <button style={{color:"black"}} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center',
};

export default GroupChatModel;