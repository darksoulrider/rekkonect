import React from 'react'
import Home from './pages/Landingpage/Home'
import { ThemeProvider } from "styled-components"
import GlobalStyles from './utils/GlobalStyles'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { darkTheme,lightTheme } from './utils/Theme'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { toggleTheme } from './redux/slices/ThemeSlice'
const App = () => {
  const dispatch = useDispatch();
  const themeValue = useSelector(state => state.Theme.Theme.themeMode);
  const changeState = ()=>{
    dispatch(toggleTheme(themeValue));
  }



  const data = {};

  console.log(document.cookie.split('=')[1]);


  return (
    <ThemeProvider theme={data} >
      <GlobalStyles/>

      <div>Theme = {themeValue}</div>


      <div>
      <button onClick={changeState}>Toggle Theme</button>
      {/* <p>Current theme mode: {data}</p> */}
    </div>
    </ThemeProvider>
  )
}

export default App