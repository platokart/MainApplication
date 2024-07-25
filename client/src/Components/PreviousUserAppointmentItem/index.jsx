import React, { useEffect, useState } from 'react';
import './index.css';

const PreviousUserAppointmentItem = (props) => {
  const { userAppointmentDetails } = props;
  const { date, status, consultantId } = userAppointmentDetails;

  const [consultant, setConsultant] = useState(null);

  useEffect(() => {
    const fetchConsultantPic = async () => {
      try {
        if (consultantId) {
          const response = await fetch(`http://localhost:5000/consultant/pic/${consultantId}`);
          const data = await response.json();
          console.log('API Response:', data);  // Debugging API response
          setConsultant(data.consultant[0]);
        }
      } catch (error) {
        console.error('Error fetching consultant picture:', error);
      }
    };

    fetchConsultantPic();
  }, [consultantId]);

  const appointmentCompleted = 'Completed';
  const firstName = consultant?.basicdetails?.[0]?.firstName || 'No Name';
  const photo = consultant?.basicdetails?.[0]?.photo || 'default_image_url';

  return (
    <div className='user-appointment-details-card'>
      <div className="user-appointment-details-con">
        <div>
          <h3 className="user-appointment-details-name">{firstName}</h3>
          <p className='user-appointments-details-type'>{status}</p>
        </div>
        <img
          className='user-appointment-details-img'
          src={photo}
          alt="user-appointment-img"
        />
      </div>
      <h3 className='user-appointment-details-date'>{date}</h3>
      <p className='user-appointments-details-type'>{appointmentCompleted}</p>
    </div>
  );
}

export default PreviousUserAppointmentItem;
