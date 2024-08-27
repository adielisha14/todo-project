import React, { useState } from 'react';
import './UserProfile.css';
import deadpoolImg from './img/deadpule-img.jpg';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {editUser} from '../../services/user.js'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Deadpool');
  const [email, setEmail] = useState('deadpool@gmail.com');
  // const [role, setRole] = useState('admin');
  const [profileImg, setProfileImg] = useState(deadpoolImg);

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
      let res = await editUser({
        username:username,
        email:email,
        image:profileImg
        
      })

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
            <img src={profileImg} alt="profile" />
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
                  <AddPhotoAlternateIcon />
                </button>
              </>
            )}
          </div>
          <h1 className='profTital'>My Profile:</h1>
          <div className="editBtn">
            <button type="button" onClick={handleEditClick}><EditIcon /></button>
          </div>
          <div className='profileDetails'>
            <div className='divData'>
              <h2>User Name:</h2>
              {isEditing ? (
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              ) : (
                <p>{username}</p>
              )}
            </div>
            <div className='divData'>
              <h2>Email:</h2>
              {isEditing ? (
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              ) : (
                <p>{email}</p>
              )}
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