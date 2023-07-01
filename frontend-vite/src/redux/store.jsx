import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "./slices/checkstate"
import {pokemonApi} from "./apicall/auth";
const Store = configureStore({
  reducer: {
    [pokemonApi.reducerPath] : pokemonApi.reducer,
    
    userReducer: userReducer,
  },



  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default Store;
