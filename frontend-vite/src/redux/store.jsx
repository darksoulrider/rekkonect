import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "./slices/checkstate"
import themeReducer from "./slices/ThemeSlice"
import {pokemonApi} from "./apicall/auth";
import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from "redux-persist"

// add here to persist data [ do not add RTKquery ]
const reducers = combineReducers({
  Theme: themeReducer,
})


const persistConfig = {
  key:'root',
  version: 1,
  storage,
}
// blacklist:[''] // we can blacklist any of the reducers
const persistedReducer = persistReducer(persistConfig,reducers)



const Store = configureStore({
  reducer:{
    persistState :persistedReducer,
    pokemonApi : pokemonApi.reducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware),
});

export default Store;



/*
NOte -> do not persiste any RTKQuery api calls

create separeate reducers and includes them separately apart from redux-persist

and those which needs persistence, such ass theme and all can be done over there in redux-persist.
*/