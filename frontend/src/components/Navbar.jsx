import React from 'react'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar({ setRenderTask,role,logout }) {
  const [popUpDisplay, setPopUpDisplay] = useState('none');
  const navigate=useNavigate()
  const togglePopUp = () => {
    setPopUpDisplay(prevState => prevState === 'none' ? 'block' : 'none');
  }
  return (
    <>
      <ul className='navbar px-5 py-2.5 rounded-t-lg text-xl h-20 list-none text-center flex justify-between items-center bg-primary text-background transition-all'>
        <div className='linksDiv flex justify-around items-center w-3/5' >

          {/* <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide' style={{marginTop:'12px'}}><a><i className="fas fa-bars hamburger"></i></a></li>
      
    <li>
      <Link to={'/'}>
        LOGO
      </Link>
    </li>  */}

          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide' style={{ marginTop: '12px' }}>
            <Link to={'/'}><i className="fas fa-bars hamburger size-6 scale-150 cursor-pointer"></i>
            </Link></li>

          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide'>
            <Link to={"/userList"}>
              user list
            </Link>
          </li>
          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide'>
            <Link onClick={() => { setRenderTask((prev) => { prev + 1 }) }} to={"/taskList"}>
              todos
            </Link>
          </li>
          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide'>
            <Link to={"/"}>
              Home page
            </Link>
          </li>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '6rem' }}>
          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide'><div>
            {/* <i className="fa-solid fa-gear hamburger"></i> */}
          </div></li>
          <li className='p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide' 
          onClick={togglePopUp}><div href="">
            <i className="fa-solid fa-user hamburger cursor-pointer"></i>
          </div>

            {/* <div className='absolute flex flex-col w-1/12 items-center border border-primary bg-accent/20 text-background right-8 top-24 p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide z-40' style={{ display: popUpDisplay }}>

              <div className='cursor-pointer hover:bg-primary/20 text-text/80 rounded-sm py-2 z-50' >Profile</div>
              <div className='cursor-pointer hover:bg-primary/20 rounded-sm text-text/80 py-2 z-50' >Logout</div>

            </div> */}
            <div className='absolute flex flex-col w-1/12 items-center border border-primary bg-accent/20 text-background right-8 top-24 p-3 rounded-sm hover:bg-accent/20 font-bold leading-relaxed tracking-wide z-40' style={{display:popUpDisplay}}>
      {role==="gest"?<>
        <div  className='cursor-pointer hover:bg-primary/20 text-text/80 rounded-sm py-2 z-50' onClick={()=>navigate('/Login')}>Login</div>
        <div className='cursor-pointer hover:bg-primary/20 rounded-sm text-text/80 py-2 z-50' onClick={()=>navigate('/Register')}>Register</div>

      </>:<>
        <div  className='cursor-pointer hover:bg-primary/20 text-text/80 rounded-sm py-2 z-50' onClick={()=>navigate('/Profile')}>Profile</div>
        <div className='cursor-pointer hover:bg-primary/20 rounded-sm text-text/80 py-2 z-50' onClick={logout}>Logout</div>
      
      </>
      }
        

        </div>
          </li>
        </div>

      </ul>
    </>
  )
}

