import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import dynamicProductSlice from "./features/productList/dynamicProductSlice";
import searchgSlice from "./features/formInput/searchSlice";
import sortingSlice from "./features/formInput/sortingSlice";
import filterSlice from "./features/formInput/filterSlice";

const store = configureStore({
   reducer: { 
    cart: cartSlice,
    dynamicProduct: dynamicProductSlice,
    search: searchgSlice,
    sorting:sortingSlice,
    filter:filterSlice
  },
 });
 
 export default store;