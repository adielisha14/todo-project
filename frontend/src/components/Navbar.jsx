import React from 'react'
import { useContext,useState } from 'react';
import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
  const [popUpDisplay, setPopUpDisplay] = useState('none');
  const togglePopUp = () => {
    setPopUpDisplay(prevState => prevState === 'none' ? 'block' : 'none');
}
  return (
    <>
    <ul className='navbar'>
    <div style={{display:'flex', justifyContent:'space-around', width:'15em'}}>
    <li style={{marginTop:'12px'}}><a><i className="fas fa-bars hamburger"></i></a></li>
      
    <li>
        LOGO
    </li>
    </div>

    <div style={{display:'flex', justifyContent:'space-around', width:'6rem'}}>
    {/* <li><div href=""><i className="fa-solid fa-gear hamburger"></i></div></li> */}
    <li onClick={togglePopUp}><div href=""><i className="fa-solid fa-user hamburger"></i></div>

    <div className='popUp' style={{display:popUpDisplay}}>
        
          <div /*onClick={handleLogout}*/>Profile</div>
          <div /*onClick={handleLogout}*/>Logout</div>

        </div>
    </li>
    </div>

    </ul>
    </>
  )
}

