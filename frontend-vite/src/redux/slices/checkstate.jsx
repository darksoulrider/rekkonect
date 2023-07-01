// delte this - test case only
import {createSlice} from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name:"UserAuth",
    initialState:{
        loading:false,
        error:null,
        isAuthenticated:false,
        userData:null,
    },
    reducers:{
        LoginStart:(state)=>{
            state.loading =true;
            state.error =null;
        },
        LoginSuccess:(state,action)=>{
            state.loading =false;
            state.error = null;
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        LoginFailed:(state,action)=>{
            state.loading= false;
            state.error =  action.payload;
            state.isAuthenticated = false;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userData = action.payload;
        },
        registerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        updateProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userData = {...state.user, ...action.payload};
            state.isAuthenticated = false;
        },
        updateProfileFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        clearError:(state) => {state.error = null},
    }
})



export const {
    LoginStart,LoginFailed,LoginSuccess,
    registerStart,registerFailed,registerSuccess,
    updateProfileStart,updateProfileFailed,updateProfileSuccess,
    clearError,
} = userSlice.actions;

export default  userSlice.reducer;
