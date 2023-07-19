import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/checkstate"
import themeReducer from "./slices/ThemeSlice"
import helperReducer from "./slices/helper";
import { Authentication } from "./apicall/auth";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"


// *** RTK QUERY API CALLS ** [ DO NOT MAKE THEM PERSISTANT ] ***

import { userEmployerProfile } from "./apicall/employer/userProfile";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

// add here to persist data [ do not add RTKquery ]
const reducers = combineReducers({
  Theme: themeReducer,
})


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
// blacklist:[''] // we can blacklist any of the reducers
const persistedReducer = persistReducer(persistConfig, reducers)



const Store = configureStore({
  reducer: {
    persistState: persistedReducer,
    helper: helperReducer,
    [Authentication.reducerPath]: Authentication.reducer,
    [userEmployerProfile.reducerPath]: userEmployerProfile.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      [
        userEmployerProfile.middleware,
        Authentication.middleware,
      ]),
});



export default Store;


/*
NOte -> do not persiste any RTKQuery api calls

create separeate reducers and includes them separately apart from redux-persist

and those which needs persistence, such ass theme and all can be done over there in redux-persist.
*/