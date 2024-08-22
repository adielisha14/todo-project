// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import forgotimg from '../assets/img/forgot.svg'
import {forgotPassword} from "../services/auth"
import { useState } from 'react'

export default function Forgot(){
    const [email,setemail]=useState({email:''})
    const [err,seterr]=useState(false)
    const [secsses,setsecsses]=useState(false)

    async function tryfun() {
        let res= await forgotPassword(email)
        console.log(res);
        
        if(!res.data.auth){
            seterr(true)
            
        }else{
            setsecsses(true)

        }
        
    }
    // functionality missing - that why has comments 

    return (

        <div className="max-h-screen">
            <section className="bg-background min-h-screen flex items-center justify-center">
                <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
                    <div className="md:w-1/2 px-5">
                        <h2 className="text-2xl font-bold text-text/90">Forgot Password</h2>
                        <p className="text-sm mt-4 text-accent/75">Enter your email to reset your password</p>
                        {/* <form className='mt-6' 
                        // onSubmit={handleSubmit}
                        > */}
                            <div>
                                <label className="block text-accent/95">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    // value={credentials.email}
                                    onClick={()=>seterr(false)}
                                    onChange={(e)=>setemail({...email,email:e.target.value})}
                                    placeholder="youremail@gmail.com"
                                    className="w-full px-4 py-3 rounded-lg 
                                    bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none"   required 
                                />
                               {err&& <label style={{color:"red"}} className="block text-accent/95">Email not found</label>}
                               {secsses&& <label style={{color:"green"}} className="block text-accent/95">We will send a password recovery email. Check your email inbox</label>}

                            </div>
                        <button type="submit" onClick={tryfun} className="w-full block bg-primary/60 hover:bg-primary 
                        text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Reset Password</button>
                        {/* </form> */}

                        <div className="mt-7 grid grid-cols-3 items-center text-accent/90">
                            <hr className="border-secondary" />
                            <p className="text-center text-sm">Don't have an account?</p>
                            <hr className="border-secondary" />
                        </div>

                        <span className='flex justify-center items-center'>
                            <button className="bg-accent/10 text-text/90 border-accent
                             hover:bg-accent/60 hover:text-background py-2 w-1/3 rounded-xl
                              mt-5 text-center justify-center items-center text-sm hover:scale-105 duration-300">
                                <Link to={'/register'}>Register</Link>
                            </button>
                        </span>
                    </div>

                    <div className="w-1/2 md:flex hidden">
                        <img src={forgotimg} className="rounded-3xl items-center" alt="image"/>
                        {/* <img src={fingerprintimg} className="rounded-3xl items-center" alt="image"/> */}
                    </div>
                </div>
            </section>
        </div>
    );
};