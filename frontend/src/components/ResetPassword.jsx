import { Link,useNavigate,useSearchParams } from 'react-router-dom';
import forgotimg from '../assets/img/forgot.svg'
import timeimg from '../assets/img/time.svg'
import {resetPassword} from "../services/auth"
import { useState,useEffect } from 'react'

export default function ResetPassword(){
    const [searchParams] = useSearchParams();
    const naviget=useNavigate()

    const [pass,setPass]=useState({check:true,token:searchParams.get('token')})
    const [err,seterr]=useState(false)
    const [errmsg,seterrmsg]=useState('')
    const [secsses,setsecsses]=useState(false)
    const [time,setTime]= useState(false)

    


    

    async function tryfun() {
        if (pass.pass1 !== pass.pass2){
            seterr(true)
            seterrmsg("the passwords dont match!")
            return

        }

        let res= await resetPassword({...pass,check:false})
        console.log(res);
        
        if(!res.data.auth){
            seterr(true)
            seterrmsg(res.data.msg)
            
        }else{
            setsecsses(true)

        }
        
    }
    useEffect(() => {
      (async function fetchData() {

        
          let test=await resetPassword(pass)
          console.log(test);
          
          setTime(test.data.auth)
      })()
      
    }, [])
    

    return (

        <div className="max-h-screen">
            {!time?<section className="bg-background min-h-screen flex items-center justify-center">
                <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
                    <div className="md:w-1/2 px-5">
                        <h2 className="text-2xl font-bold text-text/90">Timed out</h2> <br/>
                            <label className="block text-accent/95">Connection timed out, create a new password reset request</label>
                            <button type="submit" onClick={()=>naviget("/forgot")} className="w-full block bg-primary/60 hover:bg-primary 
                        text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Reset Password</button>
                    </div> 
                    <div className="w-1/2 md:flex hidden">
                        <img src={timeimg} className="rounded-3xl items-center" alt="image"/>
                        {/* <img src={fingerprintimg} className="rounded-3xl items-center" alt="image"/> */}
                    </div>
                </div>
            </section>

            :

            <section className="bg-background min-h-screen flex items-center justify-center">
                <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
                    <div className="md:w-1/2 px-5">
                        <h2 className="text-2xl font-bold text-text/90">Reset Password</h2> <br/>
                        {/* <form className='mt-6' 
                        // onSubmit={handleSubmit}
                        > */}
                            <div>
                                <label className="block text-accent/95">New Password</label>
                                <input
                                    type="password"
                                    name="password1"
                                    onClick={()=>seterr(false)}
                                    onChange={(e)=>setPass({...pass,pass1:e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg 
                                    bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none"   required 
                                />

                            </div>

                            <div>
                                <label className="block text-accent/95">Type the password again</label>
                                <input
                                    type="password"
                                    name="password2"
                                    onClick={()=>seterr(false)}
                                    onChange={(e)=>setPass({...pass,pass2:e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg 
                                    bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none"   required 
                                />

                            </div>
                            
                        <button type="submit" onClick={tryfun} className="w-full block bg-primary/60 hover:bg-primary 
                        text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Reset Password</button>
                        {secsses&&<Link to={"/login"}> <label onClick={()=>naviget("/login")} style={{color:"green",cursor: "pointer"}} className="block text-accent/95 ">The password has been successfully changed.
                            <span  className='block text-accent/95 hover:scale-105 duration-300 underline '> Click here to log in</span></label></Link>}
                        {err&& <label style={{color:"red"}} className="block text-accent/95 ">{errmsg}</label>}

                        {/* </form> */}
{/* 
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
                        </span>*/}

                    </div> 
                    <div className="w-1/2 md:flex hidden">
                        <img src={forgotimg} className="rounded-3xl items-center" alt="image"/>
                        {/* <img src={fingerprintimg} className="rounded-3xl items-center" alt="image"/> */}
                    </div>
                </div>
            </section>}
        </div>
    );
};