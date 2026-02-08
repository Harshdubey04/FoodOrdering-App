import { createSlice } from "@reduxjs/toolkit";

const restSlice=createSlice({
    name:"restaurant",
    initialState:{
        list:null,
        menus:{},//Key=restid
    },
    reducers:{
        addRestaurantList:(state,action)=>{
            state.list=action.payload;
        },
        addRestaurantMenu:(state,action)=>{
            const{restid,menu}=action.payload;
            state.menus[restid]=menu;
        },
    }
})

export default restSlice.reducer;
export const{addRestaurantList,addRestaurantMenu}=restSlice.actions;