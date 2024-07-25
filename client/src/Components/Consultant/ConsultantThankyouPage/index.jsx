import React from 'react'
import './index.css'

const ConsultantThankyouPage = () => {
  return (
    <div className='thankyou-page-bg-container'>
      <h1 className='thankyou-page-heading'>Thank You!</h1>
      <p className='thankyou-page-description'>
      Thank you for submitting your credentials with Plato. Your consultant registration application will be reviewed and you will hear from us
      </p>
      <img
        className='thankyou-img'
        alt="thankyou-img"
        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715338496/WhatsApp_Image_2024-05-10_at_11.55.33_a1ec385d_xifu11.jpg"
      />
      <p className='contactus-description'>Please <span className='contact-span'>contact us</span> for any queries or clarifications</p>
    </div>
  )
}

export default ConsultantThankyouPage