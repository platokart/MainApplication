import React from 'react'
import ConsultantNavbar from '../ConsultantNavbar'
import ConsultantFooter from '../ConsultantFooter'
import SideBarPage from "../../SideBarPagePlato"

const ConsultantHomePage = () => {
  return (
    <div className='consultant-homepage-bg-container'>
        <ConsultantNavbar/>
        <div className='consultant-homepage-main-body'>
            <SideBarPage/>
        </div>
        <ConsultantFooter/>
    </div>
  )
}

export default ConsultantHomePage