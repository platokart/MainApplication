import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultantAccept = () => {
  const navigate = useNavigate();
  const [consultationRequests, setConsultationRequests] = useState([]);
  const consultantEmail = localStorage.getItem('consultantEmail');

  useEffect(() => {
    const fetchConsultationRequests = async (consultantEmail) => {
      try {
        const response = await fetch(`http://localhost:5000/consultant/consultationrequests/${consultantEmail}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:",data);
          setConsultationRequests(data);
        } else {
          console.error('Failed to fetch consultation requests');
          alert('Failed to fetch consultation requests');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching consultation requests');
      }
    };

    fetchConsultationRequests(consultantEmail);
  }, [consultantEmail]);

  const handleAccept = async (requestId, customerEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/consultant/consultationrequests/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerEmail, consultantEmail }),
      });

      if (response.status === 200) {
        navigate(`/video/consultant/${customerEmail}/${consultantEmail}`);
      } else {
        console.error('Failed to accept the consultation request');
        alert('Failed to accept the consultation request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while accepting the consultation request');
    }
  };

  if (!consultationRequests.length) {
    return (
      <div className="no-consultants-container">
        <div className="no-consultants">
          <h1>No Consultants Available</h1>
          <p>We are currently not accepting any consultants. Please check back later or contact support for more information.</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="main-container-bg">
      <div className="main-container">
        <h1>New Instant Consultation Requests</h1>
        <div className="grid-container">
          {consultationRequests.map(request => (
            <div className="profile-container" key={request.id}>
              <div className="profile-client">
                <h2>{request.clientName}</h2>
                <h3>Description:</h3>
                <p>{request.additionalInformation}</p>
              </div>
              <ul className="unorder-list-container">
                <li>Topic: {request.consultationTopic}</li>
                <li>Client Email: {request.customerEmail}</li>
                <li>Estimated Consultation duration: {request.duration}60 min</li>
                <li>Communication Channel: {request.channel}</li>
              </ul>
              <div className="button-container">
                <button type="button" onClick={() => handleAccept(request._id, request.customerEmail)}>
                  Accept
                </button>
                <button type="button" className="decline">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantAccept;
