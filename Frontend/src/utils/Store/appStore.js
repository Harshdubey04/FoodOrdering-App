import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import restReducer from "./restSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    restaurant:restReducer,
  },
});

export default appStore;
