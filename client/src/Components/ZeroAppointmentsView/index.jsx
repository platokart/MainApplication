import React from 'react'
import './index.css'

const ZeroAppointmentsView = () => (
    <div className='zero-appointments-view-bg-container'>
         <img
            src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1718016375/45a2e8134795636684a4a0d1e21ffda8_vbymkr.jpg"
            alt='zero-appointments-view'
            className='zero-appointments-view-img'
        /> 
        <p className='zero-appointments-view-desc'>You do not have any consultations yet.</p>
        <button className='zero-appointments-view-btn'>Find Consultation</button>
    </div>
  )

export default ZeroAppointmentsView