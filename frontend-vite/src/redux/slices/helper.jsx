import { createSlice } from "@reduxjs/toolkit";

const initialsate ={
    SideBarArrow:false,
    
}
export const  helper = createSlice({
    name:"helper",
    initialState:initialsate,
    reducers:{
        toggleSideBarArrow:(state)=> {
            state.SideBarArrow = state.SideBarArrow === true ? false : true;
        }
    },
})

export const {toggleSideBarArrow} = helper.actions

export default helper.reducer;