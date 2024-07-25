import React from 'react';
import "./index.css";

import "./index.css";
import { useNavigate } from 'react-router-dom';

const BasicPlanCard = () => {
    const handleButtonClick = () => {
      fetch('http://localhost:5000/api/payment-html')
            .then(response => response.text())
            .then(html => {
                // Assuming you want to display the HTML in a new window/tab
                const newWindow = window.open();
                newWindow.document.open();
                newWindow.document.write(html);
                newWindow.document.close();
            })
            .catch(error => console.error('Error fetching payment HTML:', error));
    };
  return (
    <div className="Monthly-basic-plan-card">
      
        <h2 className='Monthly-basic-heading'>Basic Plan</h2>
        <h3 className="price">₹11k/year</h3>
  
       <div className='basic-card-points'>

       <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
</svg>
            </div>
              <div>
                    <p className='buy-Monthly-point'> Designed for large corporations with ongoing consulting requirements</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Ideal for startups or occasional consultations</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Consultation with Mid-Level Management Experts</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Standard Scheduling Options</p>
            </div>
        
        </div> 
        <button onClick={handleButtonClick}>Pay later</button>
       </div>
          </div>
        
    
  );
};


const StandardPlanCard=()=>{
  const handleButtonClick = () => {
    fetch('http://localhost:5000/api/paymentMstandard-html')
          .then(response => response.text())
          .then(html => {
              // Assuming you want to display the HTML in a new window/tab
              const newWindow = window.open();
              newWindow.document.open();
              newWindow.document.write(html);
              newWindow.document.close();
          })
          .catch(error => console.error('Error fetching payment HTML:', error));
  };
    return(
    <div className="standard-card">
      
        <h2 className='standard-heading'>Standard</h2>
        <h3 className="standard-price">₹47.5k/year</h3>
      
    <div className='standard-card-points'>
       <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
                 <p className='standard-point'>Perfect for growing businesses with frequent needs</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
              <p className='standard-point'>Consultation Options</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
              <p className='standard-point'>Flexibility of choosing between Mid-Level management of Senior Management</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
              <p className='standard-point'>Flexibility of choosing between any 5 function/department & 4 industry vertical of choice for consultation </p>

            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
              <p className='standard-point'>Priority Scheduling & Broader Expertise</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
           <div className="rectangle-parent">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                     <path d="M19.3414 7.82485C19.25 7.73274 19.1413 7.65964 19.0216 7.60975C18.9019 7.55986 18.7734 7.53418 18.6437 7.53418C18.514 7.53418 18.3855 7.55986 18.2658 7.60975C18.146 7.65964 18.0374 7.73274 17.946 7.82485L10.6252 15.1554L7.54954 12.0699C7.45469 11.9783 7.34272 11.9062 7.22003 11.8579C7.09735 11.8095 6.96633 11.7858 6.83448 11.7881C6.70263 11.7904 6.57252 11.8186 6.45157 11.8712C6.33063 11.9238 6.22122 11.9996 6.1296 12.0945C6.03798 12.1893 5.96594 12.3013 5.91759 12.424C5.86924 12.5467 5.84553 12.6777 5.84781 12.8095C5.85009 12.9414 5.87832 13.0715 5.93088 13.1924C5.98345 13.3134 6.05932 13.4228 6.15417 13.5144L9.92756 17.2878C10.0189 17.3799 10.1276 17.453 10.2473 17.5029C10.3671 17.5528 10.4955 17.5785 10.6252 17.5785C10.755 17.5785 10.8834 17.5528 11.0031 17.5029C11.1229 17.453 11.2316 17.3799 11.3229 17.2878L19.3414 9.26935C19.4411 9.17733 19.5207 9.06565 19.5752 8.94134C19.6296 8.81704 19.6577 8.6828 19.6577 8.5471C19.6577 8.41139 19.6296 8.27716 19.5752 8.15285C19.5207 8.02855 19.4411 7.91686 19.3414 7.82485Z" fill="#0071C1"/>
               </svg>
            </div>
              <div>
              <p className='standard-point'>Get Faster appointment scheduling and access to a wider range of consultant expertise</p>
            </div>
        
        </div> 
        <button onClick={handleButtonClick}>Pay Now</button>

       </div>

          </div>
    );
}

const PremiumPlanCard = () => {
  const handleButtonClick = () => {
    fetch('http://localhost:5000/api/paymentMpremium-html')
          .then(response => response.text())
          .then(html => {
              // Assuming you want to display the HTML in a new window/tab
              const newWindow = window.open();
              newWindow.document.open();
              newWindow.document.write(html);
              newWindow.document.close();
          })
          .catch(error => console.error('Error fetching payment HTML:', error));
  };

    return (
        <div className='card1'>
      <div className="card2">
        
          <h2 className='Monthly-basic-heading'>Premium</h2>
          <h3 className="price">₹135K/year</h3>
         <div className='basic-card-points'>
         <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                       <path d="M15.9975 6.19248C15.9182 6.11257 15.824 6.04915 15.7201 6.00587C15.6162 5.96259 15.5048 5.94031 15.3922 5.94031C15.2797 5.94031 15.1682 5.96259 15.0644 6.00587C14.9605 6.04915 14.8662 6.11257 14.7869 6.19248L8.43581 12.5521L5.76748 9.87528C5.6852 9.79579 5.58806 9.73329 5.48162 9.69135C5.37518 9.6494 5.26152 9.62883 5.14714 9.63081C5.03275 9.63279 4.91987 9.65728 4.81494 9.70288C4.71002 9.74848 4.6151 9.81431 4.53562 9.89659C4.45613 9.97888 4.39363 10.076 4.35168 10.1825C4.30974 10.2889 4.28917 10.4025 4.29115 10.5169C4.29313 10.6313 4.31762 10.7442 4.36322 10.8491C4.40882 10.9541 4.47465 11.049 4.55693 11.1285L7.83053 14.4021C7.90978 14.482 8.00407 14.5454 8.10796 14.5887C8.21184 14.6319 8.32327 14.6542 8.43581 14.6542C8.54835 14.6542 8.65978 14.6319 8.76366 14.5887C8.86755 14.5454 8.96183 14.482 9.04108 14.4021L15.9975 7.44565C16.084 7.36582 16.1531 7.26893 16.2003 7.16109C16.2476 7.05325 16.2719 6.9368 16.2719 6.81906C16.2719 6.70133 16.2476 6.58488 16.2003 6.47704C16.1531 6.36919 16.084 6.27231 15.9975 6.19248Z" fill="#F8F9FF"/>
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Designed for large corporations with ongoing consulting requirements</p>
          
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                       <path d="M15.9975 6.19248C15.9182 6.11257 15.824 6.04915 15.7201 6.00587C15.6162 5.96259 15.5048 5.94031 15.3922 5.94031C15.2797 5.94031 15.1682 5.96259 15.0644 6.00587C14.9605 6.04915 14.8662 6.11257 14.7869 6.19248L8.43581 12.5521L5.76748 9.87528C5.6852 9.79579 5.58806 9.73329 5.48162 9.69135C5.37518 9.6494 5.26152 9.62883 5.14714 9.63081C5.03275 9.63279 4.91987 9.65728 4.81494 9.70288C4.71002 9.74848 4.6151 9.81431 4.53562 9.89659C4.45613 9.97888 4.39363 10.076 4.35168 10.1825C4.30974 10.2889 4.28917 10.4025 4.29115 10.5169C4.29313 10.6313 4.31762 10.7442 4.36322 10.8491C4.40882 10.9541 4.47465 11.049 4.55693 11.1285L7.83053 14.4021C7.90978 14.482 8.00407 14.5454 8.10796 14.5887C8.21184 14.6319 8.32327 14.6542 8.43581 14.6542C8.54835 14.6542 8.65978 14.6319 8.76366 14.5887C8.86755 14.5454 8.96183 14.482 9.04108 14.4021L15.9975 7.44565C16.084 7.36582 16.1531 7.26893 16.2003 7.16109C16.2476 7.05325 16.2719 6.9368 16.2719 6.81906C16.2719 6.70133 16.2476 6.58488 16.2003 6.47704C16.1531 6.36919 16.084 6.27231 15.9975 6.19248Z" fill="#F8F9FF"/>
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Direct Access to CXO-Level Expertise</p>
            </div>
        
        </div>
        <div  className='buy-Monthly-tick-container'>
            <div className="buy-Monthly-rectangle-parent2">
               <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                       <path d="M15.9975 6.19248C15.9182 6.11257 15.824 6.04915 15.7201 6.00587C15.6162 5.96259 15.5048 5.94031 15.3922 5.94031C15.2797 5.94031 15.1682 5.96259 15.0644 6.00587C14.9605 6.04915 14.8662 6.11257 14.7869 6.19248L8.43581 12.5521L5.76748 9.87528C5.6852 9.79579 5.58806 9.73329 5.48162 9.69135C5.37518 9.6494 5.26152 9.62883 5.14714 9.63081C5.03275 9.63279 4.91987 9.65728 4.81494 9.70288C4.71002 9.74848 4.6151 9.81431 4.53562 9.89659C4.45613 9.97888 4.39363 10.076 4.35168 10.1825C4.30974 10.2889 4.28917 10.4025 4.29115 10.5169C4.29313 10.6313 4.31762 10.7442 4.36322 10.8491C4.40882 10.9541 4.47465 11.049 4.55693 11.1285L7.83053 14.4021C7.90978 14.482 8.00407 14.5454 8.10796 14.5887C8.21184 14.6319 8.32327 14.6542 8.43581 14.6542C8.54835 14.6542 8.65978 14.6319 8.76366 14.5887C8.86755 14.5454 8.96183 14.482 9.04108 14.4021L15.9975 7.44565C16.084 7.36582 16.1531 7.26893 16.2003 7.16109C16.2476 7.05325 16.2719 6.9368 16.2719 6.81906C16.2719 6.70133 16.2476 6.58488 16.2003 6.47704C16.1531 6.36919 16.084 6.27231 15.9975 6.19248Z" fill="#F8F9FF"/>
                  </svg>
            </div>
              <div>
              <p className='buy-Monthly-point'>Dedicated Account Management & Premium Suport</p>
            </div>
        
        </div>  
        <button onClick={handleButtonClick}>Pay Now</button>

         </div>
         </div>
<div className="plus-24-outline-parent">
    <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z" fill="#191919"/>
</svg>
</div>
                
                    <div className="standard-wrapper">
                      <h3 className="standard">Standard</h3>
                    </div>
              </div>
            </div>
    );
  };

  
const BuyPremiumMonthly = () => {
  const navigate = useNavigate()
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none" className="back-link" onClick={()=>navigate('/user/home-page')}>
            <g clip-path="url(#clip0_312_190)">
              <path d="M23.5698 14.1422L16.4044 21.3075L32.055 21.3075C32.8093 21.3075 33.375 21.8732 33.375 22.6275C33.375 23.3817 32.8093 23.9474 32.055 23.9474L16.4044 23.9474L23.5698 31.1127C24.1354 31.6784 24.1354 32.4327 23.5698 32.9984C23.0041 33.564 22.2498 33.564 21.6841 32.9984L12.2561 23.5703C12.1618 23.476 11.9732 23.2874 11.9732 23.0989C11.8789 22.816 11.8789 22.4389 11.9732 22.156C11.9732 21.9675 12.1618 21.7789 12.2561 21.6846L21.6841 12.2566C22.2498 11.6909 23.0041 11.6909 23.5698 12.2566C24.1354 12.8222 24.1354 13.5765 23.5698 14.1422Z" fill="#191919"/>
            </g>
            <defs>
              <clipPath id="clip0_312_190">
                <rect width="32" height="32" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 22.627 45.2549)"/>
              </clipPath>
            </defs>
          </svg>
    <div className="buy-premium-Monthly">
     
      <div className="buy-Monthly-heading-wrapper">
        <h1 className="buy-Monthly-heading">Pricing Plans</h1>
      </div>
      <div className="frame-wrapper4">
        <div className="large-parent">
          <button className="large">
            <div className="subscribe">Monthly</div>
          </button>
          <button className="large1" onClick={()=>navigate('/buypremium/yearly')}>
            <div className="subscribe1">Yearly</div>
          </button>
        </div>
      </div>
      <div className="inner-container">
        
        <BasicPlanCard />
        <StandardPlanCard />
        <PremiumPlanCard />
      </div>
      <div className="frame-wrapper90">
        
          <div className="or">Or</div>
          
            <div className="large23">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M7.85156 14.4219C6.96094 17.0703 3.42969 17.0703 3.42969 17.0703C3.42969 17.0703 3.42969 13.5391 6.07812 12.6484" stroke="#F8F9FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.8047 8.23447L10.5 13.5392L6.96094 10.0001L12.2656 4.6954C14.2734 2.68759 16.2813 2.71103 17.1406 2.83603C17.2732 2.85372 17.3963 2.91456 17.4909 3.00916C17.5855 3.10376 17.6464 3.22686 17.6641 3.35947C17.7891 4.21884 17.8125 6.22665 15.8047 8.23447Z" stroke="#F8F9FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.9219 9.11719V14.1641C14.9195 14.3289 14.8521 14.4862 14.7344 14.6016L12.2109 17.1328C12.1309 17.2128 12.0306 17.2695 11.9208 17.297C11.8111 17.3244 11.6959 17.3215 11.5876 17.2886C11.4794 17.2558 11.382 17.1941 11.3061 17.1102C11.2301 17.0264 11.1783 16.9235 11.1562 16.8125L10.5 13.5391" stroke="#F8F9FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.382 5.57812H6.33515C6.17029 5.58047 6.01304 5.64787 5.89765 5.76563L3.3664 8.28906C3.28643 8.36912 3.2297 8.46939 3.20226 8.57916C3.17481 8.68894 3.17768 8.8041 3.21057 8.91237C3.24345 9.02064 3.30511 9.11796 3.38896 9.19393C3.47282 9.2699 3.57573 9.32168 3.68671 9.34375L6.96015 10" stroke="#F8F9FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <div className="label1">Pay per Consultation</div>
              <img className="arrowright-icon1" alt="" />
            </div>
          
      </div>
    </div>
    </>
  );
};

export default BuyPremiumMonthly;