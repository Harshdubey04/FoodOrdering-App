
import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurantList } from './Store/restSlice';

const useRestCard = () => {
  const dispatch=useDispatch();

  // const [restData,setRestData]=useState([]);
  const [filteredRestaurant,setfilteredRestaurant]=useState([]);
  const [searchedText,setsearchedText]=useState("");
  const [topRated,settopRated]=useState(false);

  //Getting data from the store
  const restData=useSelector(store=>store.restaurant.list);
  
  const fetchData=async()=>{
    let data=await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants?lat=28.7040592&lng=77.1024902`);
    let json=await data.json();
    const cards = json?.data?.cards || [];
    const restaurantCard = cards.find(
      (card) =>
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

const restaurants =
  restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    dispatch(addRestaurantList(restaurants));
    setfilteredRestaurant(restaurants);
  }
  
  useEffect(()=>{
      if(restData){
        setfilteredRestaurant(restData);
        return;
      }
      fetchData();
    },[]);
    
  return {settopRated,setfilteredRestaurant,setsearchedText,topRated,restData,filteredRestaurant,searchedText}

}

export default useRestCard;
