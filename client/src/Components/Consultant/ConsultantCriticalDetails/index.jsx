import React, { useState} from "react";
import './index.css'
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const availabities = [
  { value: 'daily', label: 'Daily' },
  { value: 'allWeekdays', label: 'All Weekdays' },
  { value: 'weekendsOnly', label: 'Weekends only' },
  { value: 'customSpecify', label: 'Custom specify' },
]



const ConsultantCriticalDetails = () => {
  const [availability,setAvailability] = useState([])
  const [timeAvailability,setTimeAvailability] = useState("")
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, checked } = event.target;

    setAvailability((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      }
      return prevSelectedOptions.filter((option) => option !== value);
    });
  };
  console.log(availability)
  
const onSubmitDetailsForm = async (e) => {
    e.preventDefault();
    try {
      const authorizationCode = localStorage.getItem('consultantAuth');
      const consultantEmail = localStorage.getItem('consultantEmail');
      console.log(consultantEmail);

      let parsedToken = null;
      if (authorizationCode) {
        try {
          parsedToken = JSON.parse(authorizationCode);
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      }

      const formData = {
        makeYourAvailability : availability,
        provideTimeAvailability : timeAvailability
      }
  
      console.log("Submitting form data:", formData);
  
      const response = await fetch(
        "http://localhost:5000/consultant/register/critical-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      
      console.log(response);
        if(response.ok===true){
          navigate("/consultant/payment-details");
        }
        
      //here redirect to userotpscreen how??
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="details-form-bg-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="detailsform-image"
        />
        <div className="details-form-contents-container">
        <div className="details-form-container">
          <h1 className="details-form-heading">Critical Details</h1>
          <form onSubmit={onSubmitDetailsForm}>
            <div className="marking-availability-container">
            <label className="details-form-label-el" htmlFor="">
                Mark your availability
              </label>
              {availabities.map(e=>(
                <div className="availability-con" key={e.value}>
                <input
                    type="checkbox"
                    className="checkbox-availability"
                    id={e.value}
                    value={e.value}
                    checked={availability.includes(e.value)}
                    onChange={handleChange}
                />
                <label className="availability-label-el" htmlFor={e.value} >{e.label}</label>
                </div>
              ))} 
            </div>
            {/** time availability k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="time-availabilty">
                Provide Time availability 
              </label>
              <input
                type="text"
                className="input-el availability-input-el"
                placeholder="Enter here"
                value={timeAvailability}
                onChange={(e) => setTimeAvailability(e.target.value)}
                id="time-availabilty"
                required
              />
            </div>
            
            <button className="details-form-signup-btn" type="submit">
              Proceed
            </button>
          </form>
        </div>
        <div className="skip-step-container">
        <p className="or">Or</p>
        <h4 className="skip-for-now" onClick={()=>navigate('/consultant/payment-details')}>Skip this step for now</h4>
        </div>
        </div>
    </div>
  );
};

export default ConsultantCriticalDetails;
