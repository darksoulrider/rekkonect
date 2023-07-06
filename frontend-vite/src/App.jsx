import React from 'react'
import { ThemeProvider, styled } from "styled-components"
import GlobalStyles from './utils/GlobalStyles'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { darkTheme,lightTheme } from './utils/Theme'
import {useSelector,useDispatch} from 'react-redux'

import Sidebar from './pages/Employer/components/Sidebar'



// ******* Pages imported *********
// import Mentordashboard from './pages/Mentor/dashboard'
// import Candidatedashboard from './pages/Candidate/dashboard/dashboard'
// import Employerdashboard from './pages/Employer/dashboard/dashboard'
import GlobalDashboard from './pages/GlobalDashboard/Dashboard/GlobalDashboard'
import Login from './pages/Authentication/Login/Login'
// import Signup from './pages/Authentication/signup/signup'
// import NotFound from './components/common/NotFound'

import EMP_Dashboard from './pages/Employer/EMP_Dashboard'


import Jobs from './pages/Employer/Jobs'
import Communication from './pages/Employer/communication'
const App = () => {



  
  const data ={
    primary:"#ffffff",
    secondary:"#ff6400",
    tertiary:"#157499"
  }

  return (
    <ThemeProvider theme={darkTheme} >
      <GlobalStyles/>
      <Router>




      

        <Routes>
           {/* <Route path="/home" element={<GlobalDashboard/>}  /> */}

          <Route  element={<EMP_Dashboard/>}> 
            <Route index path='/connect' element={<Communication/>}  />
            <Route path='/jobs' element={<Jobs/>}  />
          </Route> 

         
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

// ! chagne jobseeker and contact [ used for tiem being ]

export default App

// const data = themeValue === "light" ? lightTheme : darkTheme;

 {/* Mentor Section */}
          {/* <Route path='/employer' element={""}>
          </Route> */}
          {/* Candidate Section */}
          {/* <Route path='/employer' element={""}>
          </Route> */}
          {/* Admin Section */}
          {/* <Route path='/employer' element={""}>
          </Route> */}
          {/* No path match error */}
          {/* <Route path='*'>  
            <Route element={<NotFound/>}/>
          </Route> */}

          {/* <Route path='/profile' element={''}/>
            <Route path='/jobs' element={''}/>
            <Route path='/communication' element={''}/> */}