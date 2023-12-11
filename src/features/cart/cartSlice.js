import { createSlice } from "@reduxjs/toolkit";

const initialState={
   cartItems: [],
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers :{
      addItemToCart: (state, action) => {
         const newItem = action.payload;
         const selectCartIndex = state.cartItems.findIndex(product => product.id === newItem.id);
         if (selectCartIndex !== -1) {
            state.cartItems[selectCartIndex].quantity += newItem.quantity;
            state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * newItem.price
         } else {
            state.cartItems.push({
               ...newItem
            })
         }
      },
      removeItemFromCart: (state,action) => {
         const newItem = action.payload
         state.cartItems = newItem
      }
      
   }
})

export const {addItemToCart, removeItemFromCart} =  cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = state => state.cart.cartItems
export const selectCartItemsTotal = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrices = state => state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0)
export const removeCartItems = state => state.cart.cartItems

