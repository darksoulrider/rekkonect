import React from 'react'

// *********** components imports ******
import Ment_Navbar from './components/Ment_Navbar';
import Ment_Footer from './components/Ment_Footer';
import Ment_Leftinfo from './components/Ment_Leftinfo';
import Ment_Rightinfo from './components/Ment_Rightinfo';
import banner from '/assets/images/carear-choice_img.png';




const profile_img = "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
const Mentordashboard = () => {
  return (
    <div className='overflow-x-hidden'>
      <div className='fixed w-full z-10 shadow-ml'>
        <Ment_Navbar />
      </div>
      <div className='w-full pt-32 '>
        <img src={banner} className='w-full h-[15rem] object-cover' alt="banner" />
        <div className='relative'>
          <div className='absolute left-[4rem] top-[-5rem]'>
            <img className='border-4 border-green-600 w-40 h-40 object-cover rounded-full cursor-pointer shadow-2xl' src={profile_img} alt="profile photo" />
          </div>
        </div>
      </div>
      <div className="pt-40 flex bg-[#f7f8fa] border-2">
        <div className=''>
          <Ment_Leftinfo />
        </div>
        <div className=''>
          <Ment_Rightinfo />
        </div>
      </div>
      <div>
        <h1>Reviews section</h1>
      </div>

      <div>
        <Ment_Footer />
      </div>
    </div>
  )
}

export default Mentordashboard;