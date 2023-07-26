import { createSlice } from '@reduxjs/toolkit';
 const cartStatus = createSlice({
    name:'cartStatus',
    initialState:{
        items:[],
    },
    reducers:{
        add(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find((item)=>item.id===newItem.id);
            if(!existingItem){
                state.items.push({newItem, ...existingItem});
            }
            else{
                existingItem.quantity++;
            }
        },
        remove(state,action){
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        }
    }
 })

 export const { add , remove } = cartStatus.actions;
 const cartStatusReducer = cartStatus.reducer;
 export default cartStatusReducer;