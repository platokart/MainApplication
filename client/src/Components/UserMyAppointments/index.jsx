import React, { useEffect, useState } from 'react';
import ZeroAppointmentsView from '../ZeroAppointmentsView';
import UpcomingUserAppointmentItem from '../UpcomingUserAppointmentItem';
import PreviousUserAppointmentItem from '../PreviousUserAppointmentItem';
import './index.css';

const UserMyAppointments = () => {
  const tabsList = [
    { tabId: 'UPCOMING', text: 'Upcoming' },
    { tabId: 'PREVIOUS', text: 'Previous' }
  ];

  const [activeTab, setActiveTab] = useState(tabsList[0].tabId);
  const [zeroPreviousAppointmentsView, setZeroPreviousAppointmentsView] = useState(false);
  const [zeroUpcomingAppointmentsView, setZeroUpcomingAppointmentsView] = useState(false);
  const [upcomingAppointmentList, setUpcomingAppointmentList] = useState([]);
  const [previousAppointmentsList, setPreviousAppointmentsList] = useState([]);

  const getAppointments = async () => {
    try {
      const id = localStorage.getItem("customerId");
      const endpoint = activeTab === 'UPCOMING'
        ? `http://localhost:5000/customer/profile/consultations/upcoming/${id}`
        : `http://localhost:5000/customer/profile/consultations/previous/${id}`;
        
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (activeTab === 'UPCOMING') {
        setUpcomingAppointmentList(data.upcomingConsultations || []);
        setZeroUpcomingAppointmentsView((data.upcomingConsultations || []).length === 0);
      } else {
        setPreviousAppointmentsList(data.previousConsultations || []);
        setZeroPreviousAppointmentsView((data.previousConsultations || []).length === 0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAppointments(); // Fetch data when the component mounts or activeTab changes
  }, [activeTab]);

  const UpcomingAppointmentsView = () => (
    <div className='user-appointments-list'>
      {zeroUpcomingAppointmentsView ? (
        <ZeroAppointmentsView />
      ) : (
        upcomingAppointmentList.length > 0 ? (
          upcomingAppointmentList.map(e => (
            <UpcomingUserAppointmentItem key={e.id} userAppointmentDetails={e} />
          ))
        ) : (
          <ZeroAppointmentsView />
        )
      )}
    </div>
  );

  const PreviousAppointmentsView = () => {
    return (
    
    <div className='user-appointments-list'>
      {zeroPreviousAppointmentsView ? (
        <ZeroAppointmentsView />
      ) : (
        previousAppointmentsList.length > 0 ? (
          previousAppointmentsList.map(e => (
            <PreviousUserAppointmentItem key={e.id} userAppointmentDetails={e} />
          ))
        ) : (
          <ZeroAppointmentsView />
        )
      )}
    </div>
  )};

  return (
    <div className='user-appointments-bg-container'>
      <div className='user-appointment-header-container'>
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1717409075/Solid_arehkl.svg"
          className='user-appointments-arrow-img'
          alt="user-appointments"
        />
        <h1 className='user-appointments-heading'>My Appointments</h1>
      </div>
      <div className="user-appointment-container">
        {tabsList.map(e => (
          <button
            key={e.tabId}
            className={`${activeTab === e.tabId ? 'user-appointment-button user-appointment-button-active' : 'user-appointment-button'}`}
            id={e.tabId}
            onClick={() => setActiveTab(e.tabId)}
          >
            {e.text}
          </button>
        ))}
      </div>
      {activeTab === 'UPCOMING' ? (<UpcomingAppointmentsView />) : (<PreviousAppointmentsView />)}
    </div>
  );
};

export default UserMyAppointments;
