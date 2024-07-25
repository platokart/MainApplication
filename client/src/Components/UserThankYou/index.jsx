import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import plato_image from '../Assets/plato image.jpeg';

const ThankYou = (props) => {
  const navigate = useNavigate();
  const { consultantDetails } = props;

  // Check if consultantDetails is defined and has basicdetails
  if (!consultantDetails || !consultantDetails.basicdetails || consultantDetails.basicdetails.length === 0) {
    return <div>Loading...</div>;
  }

  const email = localStorage.getItem('email');
  const customerId = localStorage.getItem('id');
  if (!email || !customerId) {
    alert("User Id not found");
    return;
  }
  console.log(consultantDetails);
  const consultant = consultantDetails.basicdetails[0]; // Safe to use now

  const handleJoinCall = async () => {
    try {
      const response = await axios.post('http://localhost:5000/customer/home/explore/reduce-credit', { customerId });
      if (response.data.success) {
        navigate(`/video/customer/${email}/${consultantDetails.email}`);
      } else {
        alert('Insufficient credits');
      }
    } catch (error) {
      console.error('Error reducing credits:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="thank-you-container90">
      <div className='heading-container90'>
        <h1 className="user-thank-you-form-heading">
          <span>Your request has been accepted by </span>
          <span className="user-thank-you-name">{consultant.firstName} {consultant.lastName}</span>
        </h1>
      </div>
      <div className="thank-you">
        <div className="thank-you-inner">
          <img src={consultant.photo || plato_image} alt="Consultant" className="image"/>
          <h3 className="john-doe-name">{consultant.firstName} {consultant.lastName}</h3>
          <div className="frame-div1">
            {consultant.industry && consultant.industry.map(e => (
              <button key={e.label} className="resource-operations-label">
                {e.label}
              </button>
            ))}
          </div>
          <div className="frame-div1">
            <button className="resource-operations-label">
              {consultant.functionName} 
            </button>
          </div>
          <div className="user-thank-you-additional-info">
            <p><span className='user-thank-you-span'>Meeting duration</span> 60 min</p>
          </div>
          <div className="user-thank-you-action-buttons">
            <button className="action-button join-call" onClick={handleJoinCall}>Join Call</button>
            <button className="action-button view-profile" onClick={() => navigate(`/consultant-profile/${consultantDetails._id}`)}>View Consultant Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
