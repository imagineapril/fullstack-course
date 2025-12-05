import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import ordersReducer from './ordersSlice'

const store = configureStore({
  reducer:  {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
})

export default store;