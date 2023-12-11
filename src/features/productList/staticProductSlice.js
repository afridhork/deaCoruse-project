import { createSlice } from "@reduxjs/toolkit";

const initialState={
   items: [],
}

export const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers :{
      storeStatic: (state, action) => {
         const newItem = action.payload;
         state.items = newItem
      }
      
   }
})

export const {storeStatic} =  productSlice.actions
export default productSlice.reducer

export const getProductsStatic = state => state.staticProduct.items

