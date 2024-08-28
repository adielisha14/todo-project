import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { PencilIcon,UserPenIcon,Upload } from 'lucide-react';
import {editUser,getUser} from '../../services/user.js'

export default function UserProfile() {

  const [isEditing, setIsEditing] = useState(false);
  const [profileImg, setProfileImg] = useState(`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${Math.floor(Math.random()*1000000)}`);

  const [user,setUser]=useState({})

  useEffect(() => {
    (async function getData() {
      const res=await getUser()
      console.log(res);
       if (!res.data.status ||!res.data.status ){
        console.log(res.data);
        
          setUser({role:"gest"})

       }else{
        console.log(res.data.msg);
        
        setUser(res.data.msg)
       }
      
    })()

  }, [])
  

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById('upload-button').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  async function saveChanges (){
    try{
      let res = await editUser(user._id,user)
      console.log(res);
      

    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='userProfile'>
        <div className='profileGradiat'></div>
        <div className="profaileDown">
          <div className="imgPro">
            <img src={user.image? user.image: profileImg} alt="profile" />
            {isEditing && (
              <>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} 
                  id="upload-button"
                />
                <button type="button" onClick={handleImageUploadClick}>
                  <Upload/>
                </button>
              </>
            )}
          </div>
          <h1 className='profTital'>My Profile:</h1>
          <div className="editBtn">
            <button type="button" onClick={handleEditClick}><UserPenIcon className='h-10 w-10' /></button>
          </div>
          <div className='profileDetails'>
            <div className='divData'>
              <h2>User Name:</h2>
              {isEditing ? (
                <input 
                  type="text" 
                  value={user.username} 
                  onChange={(e) => setUser({...user,username:e.target.value})} 
                />
              ) : (
                <p>{user.username}</p>
              )}
            </div>
            <div className='divData'>
              <h2>Email:</h2>
              {isEditing ? (
                <input 
                  type="email" 
                  value={user.email} 
                  onChange={(e) => setUser({...user,email:e.target.value})} 
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className='divData'>
              <h2>role:</h2>
              <p> {user.role}</p>
            </div>
              {/* 
            <div className='divData'>
              <h2>Role:</h2>
              {isEditing ? (
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                />
              ) : (
                <p>{role}</p>
              )}
            </div> 
                */}
          </div>
          {isEditing && <button type="submit" onClick={saveChanges}>Update</button>}
        </div>
      </div>
    </form>
  );
}