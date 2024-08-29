import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeimg from '../assets/img/analystic.svg'

export default function Err({access,nav}) {
    const naviget=useNavigate()

  return (
    <div className="max-h-screen">
    <section className="bg-background min-h-screen flex items-center justify-center">
        <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
            <div className="md:w-1/2 px-5">
                <h2 className="text-2xl font-bold text-text/90">Unauthorized access</h2> <br/>
                    <label className="block text-accent/95">
                            You do not have access to this page,<br/>
                            This page is for {access} only.</label>
                    <button onClick={()=>naviget(`/login`)} className=" bg-primary/60 hover:bg-primary 
                            text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Login </button>
                    /<button onClick={()=>naviget(`/${nav}`)} className=" bg-primary/60 hover:bg-primary 
                            text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300"> {nav} </button>
            </div> 
            <div className="w-1/2 md:flex hidden">
                <img src={timeimg} className="rounded-3xl items-center" alt="image"/>
                {/* <img src={fingerprintimg} className="rounded-3xl items-center" alt="image"/> */}
            </div>
        </div>
    </section>
    </div>
  )
}
