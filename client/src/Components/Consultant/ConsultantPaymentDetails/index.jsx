import React, { useState,useEffect ,useRef} from "react";
import './index.css'
import { Select } from "antd";
import {v4 as uuidv4} from 'uuid'

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const { Option } = Select;

const titles = [
  {
    id : uuidv4(),
    job : 'Senior Manager',
  },
  {
    id : uuidv4(),
    job : 'Assistant General Manager',
  },
  {
    id : uuidv4(),
    job : 'Deputy General Manager',
  },
  {
    id : uuidv4(),
    job : 'General Manager',
  },
  {
    id : uuidv4(),
    job : 'Senior General Manager',
  },
  {
    id : uuidv4(),
    job : 'AVP',
  },
  {
    id : uuidv4(),
    job : 'DVP',
  },
  {
    id : uuidv4(),
    job : 'VP',
  },
  {
    id : uuidv4(),
    job : 'Sr VP',
  },
  {
    id : uuidv4(),
    job : 'EVP',
  },
  {
    id : uuidv4(),
    job : 'President',
  },
  {
    id : uuidv4(),
    job : 'Director',
  },
  {
    id : uuidv4(),
    job : 'Senior Director',
  },
  {
    id : uuidv4(),
    job : 'Executive Director',
  },
]



const PaymentDetails = () => {
  const [bankAccountNo,setBankAccountNo] = useState("")
  const [ifsc,setIfsc] = useState("")
  const [bankName,setBankName] = useState("")
  const [branchAddress,setBranchAddress] = useState("")
  const [pan,setPan] = useState("");
  //supporting document file
  const [cancelledChequeCopy,setCancelledChequeCopy] = useState(null)
  const [base64Cheque,setBase64Cheque] = useState(null);
  const navigate=useNavigate();
  //using useRef() hook
  const inputRefForCheque = useRef(null);
  
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
        bankAccountNumber:bankAccountNo,
        ifscCode:ifsc,
        bankName:bankName,
        bankBranch:branchAddress,
        panNumber:pan,
        cancelledCheque:base64Cheque,
      }
  
      console.log("Submitting form data:", formData);
  
      const response = await fetch(
        "http://localhost:5000/consultant/register/payment-details",
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
          navigate("/consultant/set-password");
        }
        
      //here redirect to userotpscreen how??
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //handling resume img click
  const hanldeCheque = () =>{
    inputRefForCheque.current.click()
  }

  
  return (
    <div className="details-form-bg-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="detailsform-image"
        />
        <div className="details-form-contents-container">
        <div className="details-form-container">
          <h1 className="details-form-heading">Payment Details</h1>
          <form onSubmit={onSubmitDetailsForm}>
            {/** bank account number*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="bank-account-no">
                Bank account number 
              </label>
              <input
                type="text"
                className="details-form-input-el"
                placeholder="Enter here..."
                value={bankAccountNo}
                onChange={(e) => setBankAccountNo(e.target.value)}
                id="bank-account-no"
                required
              />
            </div>
            {/** IFSC k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="ifsc">
                IFSC 
              </label>
              <input
                type="text"
                className="details-form-input-el"
                placeholder="Enter here..."
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                id="ifsc"
                required
              />
            </div>
            {/**Bank name k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="bank-name">
                Bank name
              </label>
              <input
                type="text"
                className="details-form-input-el"
                placeholder="Enter here..."
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                id="bank-name"
                required
              />
            </div>
            {/** branch address k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="branch-address">
                Branch Address
              </label>
              <input
                type="text"
                className="details-form-input-el"
                placeholder="Enter here..."
                value={branchAddress}
                onChange={(e) => setBranchAddress(e.target.value)}
                id="ctc"
                required
              />
            </div>
            
            {/** cancelled cheque k*/}
            <div className="input-container">
              <label className="details-form-label-el resume-label" htmlFor="cancelled-cheque">
              Cancelled cheque scanned copy 
              </label>
              <div className="resume-container">
                {/**first container */}
                <div className="resume-container-1" onClick={hanldeCheque} style={{cursor:"pointer"}}>
                  <div>
                    <img
                        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715353768/file-add_vjkblk.png"
                        alt="file-upload-img"
                        className="file-upload-img"
                    />
                    <input
                      type="file"
                      required
                      ref = {inputRefForCheque}
                      style={{display : "none"}}
                      // placeholder="Search"
                      // value={resumeFile}
                      onChange={(e) => {
                        const uploadedCheque = e.target.files[0];
                        setCancelledChequeCopy(uploadedCheque);
                        if (uploadedCheque) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBase64Cheque(reader.result);
                          };
                          reader.readAsDataURL(uploadedCheque);
                        }
                      }}
                      id="cancelled-cheque"
                    />
                  </div>
                  <p className="resume-description">Click to upload</p>
                </div>
                {/**second container */}
                <div className="resume-container-2">
                  <input
                    type="checkbox"
                    className="resume-checkbox"
                    checked={cancelledChequeCopy!==null}
                  />
                  <div className="resume-description-container">
                    {cancelledChequeCopy !== null ?(<p className="resume-description-1">{cancelledChequeCopy.name}</p>):(<p className="resume-description-1">cheque.pdf</p>)}
                    <p className="resume-description-2">upload complete</p>
                  </div>
                </div>
              </div>
            </div>
            {/** pan number */}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="pan">
              PAN number (Ensure name is same appearing in bank credentials and PAN card)
              </label>
              <input
                type="text"
                className="details-form-input-el"
                placeholder="Enter here..."
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                id="pan"
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
        <h4 className="skip-for-now" onClick={()=>navigate("/consultant/set-password")}>Skip this step for now</h4>
        </div>
        </div>
    </div>
  );
};

export default PaymentDetails;
