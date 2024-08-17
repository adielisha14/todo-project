import React, { useState ,useEffect} from "react";
import moon from '../assets/img/moon.svg'
import sun from '../assets/img/sun.svg'

export default function SwitchTheme() {

    const [theme, setTheme] = useState(() => {
        if(window.localStorage.getItem('theme')){
            return window.localStorage.getItem('theme');
        }
        else if(window.matchMedia("(prefers-color-scheme: dark)").matches){
            return "dark-brown-orange";
        }
            return "light-brown-orange";
        });
        
        useEffect(() => {
            if(theme === "dark-brown-orange"){
            document.querySelector("html").classList.remove("light-brown-orange");
            document.querySelector("html").classList.add("dark-brown-orange");
            window.localStorage.setItem('theme', theme)
            }else{
            document.querySelector("html").classList.remove("dark-brown-orange");
            document.querySelector("html").classList.add("light-brown-orange");

            window.localStorage.setItem('theme', theme)
            }
        }, [theme]);
        
        const handleChangeTheme = () => {
            setTheme((prev) => (prev === "light-brown-orange" ? "dark-brown-orange" : "light-brown-orange"));
        };

    return (
        <>
        <div className="relative">
        <div className="fixed bottom-10 right-10 z-20 border border-primary/70 rounded p-1">
            <div
            className=" text-text bg-secondary/20 hover:bg-secondary/50 w-10 h-10 flex cursor-pointer justify-center items-center rounded p-1"
            onClick={handleChangeTheme}
            >
            {theme === 'dark-brown-orange' ? <img src={sun}/> : <img src={moon}/> }
            </div>

        </div>
        </div>
        </>
    );
}
