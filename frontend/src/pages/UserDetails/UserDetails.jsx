import React from 'react'
import './UserDetails.css'
import { useState } from 'react'
import userImage from './image/user-img.png'

function UsersDetails() {
  
  const[users,setUsers]=useState([{nickName:'Deadpool', email:'dedpool@gmail.com', phoneNumber:'0546080824', image:''},
                               {nickName:'The Rock', email:'rock@gmail.com', phoneNumber:'0507894562', image:''},
                               {nickName:'President Trump', email:'trump@gmail.com', phoneNumber:'0528546329', image:''},])
               
  const nwUser =users.map((use)=>(
    <ul className='userList' key={use.nickName}>{use.nickName}
    <img src={userImage} className='userImage'></img>
      <li>Nick Name: {use.nickName}</li>
      <li>Email: {use.email}</li>
      <li>Phone Number: {use.phoneNumber}</li>
    </ul>
  ))                                 
  return (
  <div className='userConteiner'>
      <h2>Meet our portal user's:</h2>
      <div className='list'>
        {nwUser}
      </div>      
  </div>
)
}

export default UsersDetails