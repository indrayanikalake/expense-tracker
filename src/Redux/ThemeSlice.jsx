import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:{
        lightMode:false,
    },
    reducers:{
        toggleTheme(state){
            state.lightMode=!state.lightMode;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;