import React from 'react'
import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
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
    <li><a href=""><i className="fa-solid fa-gear hamburger"></i></a></li>
    <li><a href=""><i className="fa-solid fa-user hamburger"></i></a></li>
    </div>
    </ul>
    </>
  )
}

export default Navbar