import React from 'react';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import accessimg from '../assets/img/access.svg';
// import fingerprintimg from '../assets/img/fingerprint.svg';

export default function Login(){
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials);
    };

    return (
    <div className="max-h-screen">
    <section className="bg-background min-h-screen flex items-center justify-center">
        <div className="bg-secondary/20 p-5 flex rounded-3xl shadow-accent/20 shadow-xl hover:shadow-accent/40 transition-all max-w-3xl">
        <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-text/90">Login</h2>
            <p className="text-sm mt-4 text-accent/75">If you have an account, please login</p>
                <form className='mt-6' onSubmit={handleSubmit}>
                <div>
                    <label className="block text-accent/95">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full px-4 py-3 rounded-lg bg-primary/25 mt-2 border focus:border-accent/90 focus:bg-primary/40 border-secondary outline-none" autofocus autocomplete required 
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
                        minlength="6" className="w-full px-4 py-3 rounded-lg bg-primary/25 mt-2 border focus:border-accent/90
                        focus:bg-primary/40 border-secondary outline-none" required
                    />
                </div>
                <div className="text-center mt-2">
                    <Link to={'/forgot'} className="text-sm font-semibold text-secondary hover:text-accent/90">Forgot Password? click here</Link>
                </div>
                <button type="submit" className="w-full block bg-primary/60 hover:bg-primary font-bold text-background rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300">Login</button>
                </form>

                <div className="mt-7 grid grid-cols-3 items-center text-accent/90">
                <hr className="border-secondary" />
                <p className="text-center text-sm">Don't have an account?</p>
                <hr className="border-secondary" />
                </div>
                <span className='flex justify-center items-center'>
                <button className="bg-accent/10 text-text/90 border-accent hover:bg-accent/50 hover:text-background py-2 w-1/3 rounded-xl mt-5 text-center justify-center items-center text-sm hover:scale-105 duration-300">
                    <Link to={'/register'}>Register</Link>
                </button>
                </span>
            </div>

            <div className="w-1/2 md:flex hidden">
                <img src={accessimg} className="rounded-3xl items-center" alt="image"/>
                {/* <img src={fingerprintimg} className="rounded-3xl items-center" alt="image"/> */}
            </div>
            </div>
        </section>
        </div>
    );
};