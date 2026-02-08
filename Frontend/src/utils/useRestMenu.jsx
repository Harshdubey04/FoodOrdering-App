import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurantMenu } from './Store/restSlice';

const useRestMenu = (restid) => {
  const dispatch=useDispatch();
  const restMenu=useSelector(state=>state.restaurant.menus[restid]);
    useEffect(()=>{
      if(restMenu)return;
        fetchMenu();
    },[restid,restMenu]);
    const fetchMenu=async ()=>{
      const data=await fetch(`http://localhost:5000/api/menu/${restid}?lat=28.7040592&lng=77.1024902`);
      const json = await data.json();  
      dispatch(addRestaurantMenu({restid,menu:json.data})) 
    }
    return {restMenu};
}
export default useRestMenu;


