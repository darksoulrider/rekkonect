import { createSlice } from "@reduxjs/toolkit";

const initialsate ={
    themeMode:"light",
}
export const  themeSlice = createSlice({
    name:"theme",
    initialState:initialsate,
    reducers:{
        toggleTheme:(state)=> {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
        }
    },
})

export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer;