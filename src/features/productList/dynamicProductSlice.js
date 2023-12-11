import { createSlice } from "@reduxjs/toolkit";

const initialState={
   items: [],
}

export const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers :{
      storeDynamic: (state, action) => {
         const newItem = action.payload;
         state.items = newItem
      }
      
   }
})

export const {storeDynamic} =  productSlice.actions
export default productSlice.reducer

export const getProductsDynamic = state => state.dynamicProduct.items

