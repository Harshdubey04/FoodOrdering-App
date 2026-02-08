import { createSlice } from "@reduxjs/toolkit";

/* Load cart from localStorage when app starts */
const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem("cart");//Reads saved data under key "cart" from browser storage.
        return data ? JSON.parse(data) : [];//If data exists → convert string into JavaScript array using JSON.parse
    } catch {
        return [];
    }
};

/*  Save cart to localStorage whenever it changes */
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem("cart", JSON.stringify(items));//Converts cart array → string and Stores it in browser memory under "cart"
    } catch(err){
        console.log(err);
    }
};

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        // items:[],// each item: { card: {...}, quantity: 1 }
        items: loadCartFromStorage(),
    },
                                          
    reducers:{
        addItem:(state,action)=>{
            const id=action?.payload?.card?.info?.id;
            const existingItems=state?.items?.find((i)=>i?.card?.info?.id===id);

            if(existingItems){
                existingItems.quantity+=1;
            }
            else{
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartToStorage(state.items); //  Save
        },
        removeItem: (state, action) => {
            const id = action.payload;
            //filtering the items which do not have that id 
            state.items = state.items.filter(
            (item) => item?.card?.info?.id !== id
            );

            saveCartToStorage(state.items); //  Save
        },

        emptyItem:(state)=>{
            state.items.length=0;
            saveCartToStorage(state.items); //Save
        },

        decreaseItemByOne: (state, action) => {
            const id = action.payload;
            const existingItems=state.items.find(item=>item?.card?.info?.id===id);
            if(!existingItems)return;
            if(existingItems.quantity>1){
                existingItems.quantity-=1;
            }
            else{
                //remove the item if quantity is 1
                state.items=state?.items?.filter(item=>item?.card?.info?.id !==id);
            }

            saveCartToStorage(state.items); // Save

        },
  
        
    }
})

export default cartSlice.reducer;
export const {addItem,removeItem,emptyItem,decreaseItemByOne}=cartSlice.actions;


