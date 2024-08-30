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
      <div className='userProfile flex flex-col justify-center items-center bg-background text-text'>
        <div className='profileGradiat bg-secondary/20 h-36 w-full'></div>
        <div className="profaileDown">
          <div className="imgPro flex justify-center items-center">
            <img src={user.image? user.image: profileImg} alt="profile" className='h-56 w-56 rounded-lg shadow-md p-4'/>
            {isEditing && (
              <>
                <input
                  className='w-full h-full py-1 px-2 border border-secondary outline-none rounded-lg bg-primary/25 cursor-pointer focus:border-accent/90 focus:bg-primary40' 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} 
                  id="upload-button"
                />
                <button type="button" onClick={handleImageUploadClick} className='flex justify-center items-center m-1 rounded-md bg-primary/90 hover:bg-primary'>
                  <Upload/>
                </button>
              </>
            )}
          </div>
          <h1 className='profTital font-extrabold text-5xl mt-14 text-center text-text'>My Profile:</h1>
          <div className="editBtn w-fit h-fit flex mt-5 rounded-md -mb-4 ml-12 bg-primary/50 hover:bg-primary/70">
            <button type="button" onClick={handleEditClick}><UserPenIcon className='h-10 w-10' /></button>
          </div>
          <div className='profileDetails h-full w-full px-10 pt-5 pb-8'>
            <div className='divData bg-secondary/20 block rounded-md py-5 px-10 m-3 shadow-sm'>
              <h2 className='text-2xl font-bold mb-1 text-accent/95'>User Name:</h2>
              {isEditing ? (
                <input
                  className='w-full py-1 px-2 border border-secondary outline-none rounded-lg bg-primary/25 cursor-pointer focus:border-accent/90 focus:bg-primary40' 
                  type="text" 
                  value={user.username} 
                  onChange={(e) => setUser({...user,username:e.target.value})} 
                />
              ) : (
                <p>{user.username}</p>
              )}
            </div>
            <div className='divData bg-secondary/20 block rounded-md py-5 px-10 m-3 shadow-sm'>
              <h2 className='text-2xl font-bold mb-1 text-accent/95'>Email:</h2>
              {isEditing ? (
                <input
                  className='w-full py-1 px-2 border border-secondary outline-none rounded-lg bg-primary/25 cursor-pointer focus:border-accent/90 focus:bg-primary40' 
                  type="email" 
                  value={user.email} 
                  onChange={(e) => setUser({...user,email:e.target.value})} 
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className='divData bg-secondary/20 block rounded-md py-5 px-10 m-3 shadow-sm'>
              <h2 className='text-2xl font-bold mb-1 text-accent/95'>role:</h2>
              <p> {user.role}</p>
            </div>
              {/* 
            <div className='divData bg-secondary/20'>
              <h2>Role:</h2>
 text-accent/95              {isEditing ? (
                <input
                  className='border border-secondary outline-none rounded-lg bg-primary/25 cursor-pointer focus:border-accent/90 focus:bg-primary40' 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                />
              ) : (
                <p>{role}</p>
              )}
            </div> 
                */}
          {isEditing && <button type="submit" className='bg-accent/10 text-text/90 border-accent hover:bg-accent/50 hover:text-background py-2 w-1/3 rounded-xl mt-5 text-center justify-center items-center text-sm hover:scale-105 duration-300' onClick={saveChanges}>Update</button>}
          </div>
        </div>
      </div>
    </form>
  );
}