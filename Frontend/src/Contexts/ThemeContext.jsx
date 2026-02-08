import {createContext, useEffect, useState } from "react";
//Create the context
export const Theme=createContext();

const ThemeProvider=({children})=>{

    const [theme,setTheme]= useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const handleTheme=()=>{

        setTheme((prev)=>prev==="light"?"dark":"light");
    }

    useEffect(() => {
        document.body.className = theme; // "dark" or "light"
        localStorage.setItem("theme", theme); //Save theme
    }, [theme]);

    const value={
        handleTheme,
        setTheme,
        theme
    }
    return(
        <Theme.Provider value={value}>
            {children}
        </Theme.Provider>
    )
}

export default ThemeProvider


