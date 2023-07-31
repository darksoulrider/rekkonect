import React from 'react'
import { ThemeProvider, styled } from "styled-components"
import GlobalStyles from './utils/GlobalStyles'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { darkTheme, lightTheme } from './utils/Theme'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'


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
import Profile from './pages/Employer/Profile'
import Candidate from './pages/Employer/Candidate'
import CreateJob from './pages/Employer/components/CreateJob'
import Editjob from './pages/Employer/components/Editjob'


// ************** Mentor imports ************************
import Mentordashboard from './pages/Mentor/Ment_dashboard'

// ************** End Mentor imports ************************





// ****** Protected routes ************
import ProtectedRoutes from './utils/RoutesProtection/ProtectedRoutes'
import UnAuthProtectedRoutes from './utils/RoutesProtection/UnAuthProtectedRoutes'


const App = () => {


  const data = {
    primary: "#ffffff",
    secondary: "#ff6400",
    tertiary: "#157499"
  }
  let isAuth = true;
  let usertype = "mentor";
  /*
  -> 
  get token and userType from cookies, which we are sending from backend
  */
  return (
    <ThemeProvider theme={darkTheme} >
      <GlobalStyles />
      <Router>

        <Routes>
          {/* Un-Authenticated section  */}
          <Route element={<UnAuthProtectedRoutes token={isAuth} userType={usertype} />}>
            <Route path="/home" element={<GlobalDashboard />} />
            <Route path='/login' element={<Login />} />
          </Route>


          {/* employer dashboard */}\
          <Route element={<ProtectedRoutes userType={usertype} cstmUserType={'employer'} token={isAuth} />}  >
            <Route element={<EMP_Dashboard />}>
              <Route path='/employer/profile' element={<Profile />} />
              <Route path="/employer" element={<Navigate to="/employer/profile" />} />
              <Route path='/employer/connect' element={<Communication />} />
              <Route path='/employer/jobs' element={<Jobs />} />
              <Route path='/employer/jobs/create' element={<CreateJob />} />
              <Route path='/employer/jobs/edit/:id' element={<Editjob />} />
              <Route path='/employer/candidates' element={<Candidate />} />
            </Route>
          </Route>


          {/* Similar way protect mentor and Employer by passing cstmuser and userType */}
          {/* take redirect as props as well */}
          <Route element={<ProtectedRoutes userType={usertype} cstmUserType={'mentor'} token={isAuth} />}>
            <Route>
              <Route path="/mentor/dashboard" element={<Mentordashboard />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

// ! chagne jobseeker and contact [ used for tiem being ]

export default App

// const data = themeValue === "light" ? lightTheme : darkTheme;

{/* Mentor Section */ }
{/* <Route path='/employer' element={""}>
          </Route> */}
{/* Candidate Section */ }
{/* <Route path='/employer' element={""}>
          </Route> */}
{/* Admin Section */ }
{/* <Route path='/employer' element={""}>
          </Route> */}
{/* No path match error */ }
{/* <Route path='*'>  
            <Route element={<NotFound/>}/>
          </Route> */}

{/* <Route path='/profile' element={''}/>
            <Route path='/jobs' element={''}/>
            <Route path='/communication' element={''}/> */}