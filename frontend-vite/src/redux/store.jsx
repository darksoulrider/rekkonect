import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "./slices/checkstate"
import themeReducer from "./slices/ThemeSlice"
import {pokemonApi} from "./apicall/auth";
import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore} from "redux-persist"

// add here to persist data
const reducers = combineReducers({
  Theme: themeReducer,
})
// timepass checking addtional reducers
const  myreducer = combineReducers({
  love:reducers,
})


const persistConfig = {
  key:'persist-store',
  storage,
  blacklist:[''] // we can blacklist any of the reducers
}
const persistedReducer = persistReducer(persistConfig,reducers)




const Store = configureStore({
  reducer: {
    [pokemonApi.reducerPath] : pokemonApi.reducer,
    userReducer: userReducer,
    Theme:persistedReducer,
    Love:myreducer,
  },



  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default Store;
