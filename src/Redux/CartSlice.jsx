import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        isVisible:false,
    },
    reducers:{
        toggleCartVisibility(state){
            state.isVisible = !state.isVisible;
        }
    }

});

export const { toggleCartVisibility } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;