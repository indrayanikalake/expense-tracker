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
            state.items = state.items.filter((item) => item.newItem.id !== id);
            console.log(state.items);
        },
        increase(state, action){
            const id = action.payload;
            const item = state.items.find((item) => item.newItem.id === id);
            item.newItem.quantity++;
        },
        decrease(state, action){
            const id = action.payload;
            const item = state.items.find((item) => item.newItem.id === id);
            item.newItem.quantity--;
            if(item.newItem.quantity === 0) state.items = state.items.filter((item) => item.newItem.id !== id);
            
        }
    }
 })

 export const { add , remove, increase ,decrease } = cartStatus.actions;
 const cartStatusReducer = cartStatus.reducer;
 export default cartStatusReducer;