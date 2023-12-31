import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './redux/store.jsx'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(Store);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  //  </React.StrictMode>,
)

