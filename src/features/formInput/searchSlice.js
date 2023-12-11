import { createSlice } from "@reduxjs/toolkit";

const initialState={
   items: []
}

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers :{
      search: (state, action) => {
         const newItem = action.payload
         const data = [...newItem.products]
         const type = newItem.type
         let dataFilter = []
         for(let i in data){
            if(type === ''){
               console.log('cek type search 1', type, data);
               dataFilter = data
            }else{
               if(data[i].title.toUpperCase().indexOf(type.toUpperCase()) !== -1){
                  dataFilter.push(data[i])
               }
            }
         }
         console.log('cek type search', dataFilter);
         state.items = dataFilter
      }
      
   }
})

export const {search} =  searchSlice.actions
export default searchSlice.reducer

export const selectSearchResult = state =>  state.search.items

