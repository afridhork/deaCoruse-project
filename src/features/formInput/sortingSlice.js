import { createSlice } from "@reduxjs/toolkit";

const initialState={
   items: []
}

export const sortingSlice = createSlice({
   name: 'sorting',
   initialState,
   reducers :{
      sorting: (state, action) => {
         const newItem = action.payload;
         const data = [...newItem.products]
         const type = newItem.type
         if(type === 'asc'){
            data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
         }else if(type === 'desc'){
            data.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
         }else if(type === 'highest'){
            data.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
         }else if(type === 'lowest'){
            data.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
         }
         state.items = data
      }
      
   }
})

export const {sorting} =  sortingSlice.actions
export default sortingSlice.reducer

export const selectSortingResult = state =>  state.sorting.items

