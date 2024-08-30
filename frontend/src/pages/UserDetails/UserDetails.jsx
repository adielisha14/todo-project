import React from 'react'
// import './UserDetails.css'
import { useState,useEffect } from 'react'
import userImage from './image/user-img.png'
import {userList,deleteUser} from '../../services/user'
import {TrashIcon} from "@radix-ui/react-icons"

function UsersDetails() {  
  const[users,setUsers]=useState([{nickName:'Deadpool', email:'dedpool@gmail.com', phoneNumber:'0546080824', image:''},
                               {nickName:'The Rock', email:'rock@gmail.com', phoneNumber:'0507894562', image:''},
                               {nickName:'President Trump', email:'trump@gmail.com', phoneNumber:'0528546329', image:''},])
  async function getData() {
    let res= await userList()
      
    if(res){
      console.log(res);
      

        setUsers(res)
    }else{
        setUsers([])
    }
    
  }
  async function userDelete(id) {
    console.log(id);
    
    let res= await deleteUser(id)
      
    if(res){
      console.log(res);
     await getData()
        
    }else{
        setUsers([])
    }
  }

  useEffect(() =>{getData()},[])
  
                               
                             
  return (
  <div className='userConteiner flex flex-col items-center justify-center rounded-md w-full mb-8'>
      <h2 className='flex text-text justify-center text-4xl font-extrabold mb-5'>Meet our portal user's:</h2>
      <div className='list'>
        {users.length>0?users.map((use,inx)=>(
        <ul className='userList rounded-md bg-accent/20 px-5 py-8 my-5 text-2xl font-bold text-primary' key={inx}>
          <div className='flex items-center justify-between'>
            {use.username}
            <TrashIcon onClick={()=>{userDelete(use._id)}} className='delete text-red-600 h-6 w-6'/> 
          </div>
          <img src={use.image?use.image:userImage} className='userImage h-32 w-[80%] my-1 mx-auto rounded-xl object-cover'></img>
          <li className='text-lg text-text/80' >Name: {use.username}</li>
          <li className='text-lg text-text/80'>Email: {use.email}</li>
          <li className='text-lg text-text/80'>role: {use.role}</li>
        </ul> )):<h2>no users</h2>  }
 
      </div>      
  </div>
)
}

export default UsersDetails