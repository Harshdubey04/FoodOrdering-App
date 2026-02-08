import { useEffect, useState } from "react";

const useOnlineStatus=()=>{
    const [onlineStatus,setonlineStatus]=useState(navigator.onLine);
    //Check if online or not
    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setonlineStatus(false);
        }) 

        window.addEventListener("online",()=>{
            setonlineStatus(true);
        }) 
    },[]);

    //Return boolean value
    return onlineStatus;
};

export default useOnlineStatus;