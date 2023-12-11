import { createSlice } from "@reduxjs/toolkit";

const initialState={
   items: []
}

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers :{
      filter: (state,action) => {
         const newItem = action.payload
         const data = [...newItem.products] 
         const type = newItem.type
         let newData = []
         if(type === "men's clothing"){
            data.find(item => {
               if(item.category === type){
                  newData.push(item)
               }
            })
         }else if(type === "jewelery"){
           data.find(item => {
               if(item.category === type){
                  newData.push(item)
               }
            })
         }else if(type === "electronics"){
           data.find(item => {
               if(item.category === type){
                  newData.push(item)
               }
            })
         }else if(type === "women's clothing"){
           data.find(item => {
               if(item.category === type){
                  newData.push(item)
               }
            })
         }else{
            newData = data
         }

         state.items = newData
      }      
   }
})

export const {filter} =  filterSlice.actions
export default filterSlice.reducer

export const selectFilterResult = state =>  state.filter.items

