import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import staticProductSlice from "./features/productList/staticProductSlice";
import dynamicProductSlice from "./features/productList/dynamicProductSlice";
import searchgSlice from "./features/formInput/searchSlice";
import sortingSlice from "./features/formInput/sortingSlice";
import filterSlice from "./features/formInput/filterSlice";

const store = configureStore({
   reducer: { 
    cart: cartSlice,
    staticProduct: staticProductSlice,
    dynamicProduct: dynamicProductSlice,
    search: searchgSlice,
    sorting:sortingSlice,
    filter:filterSlice
  },
 });
 
 export default store;