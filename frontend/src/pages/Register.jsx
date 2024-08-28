import React from 'react';
import { useState }  from 'react';
// import useAuth from '../hooks/useAuth';
import { Link,useNavigate } from 'react-router-dom';
import formimg from '../assets/img/form.svg';
import { register } from '../services/auth';

export default function Register({login}){
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '' });
    const [dataErr,setDateErr]=useState(false)
    const navigate=useNavigate()

    // const { login } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res= await register(credentials)
        if (res.auth){
            login(res.token, res.role)
        }else{
            setDateErr(res.err)
        }
        
    };

    return (

        <div className="max-h-screen">
            <section className="bg-background min-h-screen flex items-center justify-center">
                <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
                    <div className="md:w-1/2 px-5">
                        <h2 className="text-2xl font-bold text-text/90">Register</h2>
                        <p className="text-sm mt-4 text-accent/75">Welcome to ToDoIt app tasks management</p>
                        {dataErr&&<p className="text-sm mt-4 text-accent/75" style={{color:"red"}}>{dataErr}</p>}
                        <form className='mt-6' onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-accent/95">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="youremail@gmail.com"
                                    className="w-full px-4 py-3 rounded-lg bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none" autoFocus required 
                                />
                            </div>
                            <div>
                                <label className="block text-accent/95">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-3 rounded-lg bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none" autoFocus required 
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-accent/95">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    minLength="6" className="w-full px-4 py-3 rounded-lg bg-primary/25 mt-2 border focus:border-accent/90
                                    focus:bg-primary/40 border-secondary outline-none" required
                                />
                            </div>
                            <button type="submit" className="w-full block bg-primary/60 hover:bg-primary text-background font-bold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Register</button>
                        </form>

                        <div className="mt-7 grid grid-cols-3 items-center text-accent/90">
                            <hr className="border-secondary" />
                            <p className="text-center text-sm">Already have an account?</p>
                            <hr className="border-secondary" />
                        </div>
                        <span className='flex justify-center items-center'>
                            <button className="bg-accent/10 text-text/90 border-accent hover:bg-accent/50 hover:text-background py-2 w-1/3 rounded-xl mt-5 text-center justify-center items-center text-sm hover:scale-105 duration-300">
                                <Link to={'/login'}>Login here</Link>
                            </button>
                        </span>
                    </div>

                    <div className="w-1/2 md:flex hidden">
                    {/* <div className="w-1/2 md:block hidden relative"> */}
                        <img src={formimg} className="rounded-3xl items-center" alt="image"/>                
                    {/* <div className="overlay rounded-3xl"></div> */}
                    </div>
                </div>
            </section>
        </div>
    );
};