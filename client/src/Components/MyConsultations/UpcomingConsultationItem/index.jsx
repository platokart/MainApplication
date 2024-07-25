import React from 'react'
import './index.css'
const UpcomingConsultationItem = (props) => {
    const {consultationDetails} = props
    const {companyName,companyWebsite,date,time} = consultationDetails

  return (
    <div className='user-appointment-details-card'>
        <div className="user-appointment-details-con">
            <div>
              <h3 className="user-appointment-details-name">{companyName}</h3>
              <p className='user-appointments-details-type'>{companyWebsite}</p>
            </div>
        </div>
        <h3 className='user-appointment-details-date'>{date}<span className='user-appointment-details-time'>-{time}</span></h3>
    </div>
  )
}

export default UpcomingConsultationItem