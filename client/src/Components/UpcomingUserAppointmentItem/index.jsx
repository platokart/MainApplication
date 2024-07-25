import React from 'react'
import './index.css'
const UpcomingUserAppointmentItem = (props) => {
    const {userAppointmentDetails} = props
    const {image,name,type,date,time} = userAppointmentDetails
    //that onclick join now button should happen only if the time we get from db === the present time
    
  return (
    <div className='user-appointment-details-card'>
        <div className="user-appointment-details-con">
            <>
              <h3 className="user-appointment-details-name">{name}</h3>
              <p className='user-appointments-details-type'>{type}</p>
            </>
            <img className='user-appointment-details-img'
              src={image}
              alt="user-appointment-img"
            />
        </div>
        <h3 className='user-appointment-details-date'>{date}<span className='user-appointment-details-time'>-{time}</span></h3>
        {/* <button onClick={() => navigate(`/video/customer/${email}/${consultantDetails.email}`)}>Join Now</button> */}
    </div>
  )
}

export default UpcomingUserAppointmentItem