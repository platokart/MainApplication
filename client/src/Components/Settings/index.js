import {useState} from 'react'
import './index.css'

const Setting=()=>{
    const[activeTab,setActiveTab]=useState('tab1')
    const[isChecked,setCheckbox]=useState(false)
    const onChangingCheckbox=(event)=>{setCheckbox(event.target.value)}


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const validatePassword = (password) => {
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const noSpacesCommasRegex = /^[^,\s]+$/;
  
      return (
        lowerCaseRegex.test(password) &&
        upperCaseRegex.test(password) &&
        specialCharRegex.test(password) &&
        noSpacesCommasRegex.test(password)
      );
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!validatePassword(password)) {
        setMessage('Password must contain one lowercase letter, one uppercase letter, one special character, and cannot contain spaces or commas.');
        return;
      }
  
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
  
      // Perform the password reset logic here (e.g., API call)
      setMessage('Password successfully reset.');
    };


{/*render Change Password*/ }
const renderContent=()=>{
    switch(activeTab){
        case 'tab1':
            return renderChangePassword()
        case 'tab2':
            return renderNotification()
    }
}
const renderNotification=()=>(
<div className='checkbox-container-main'>
   
    <h4>SMS Settings:</h4>
    <div className='checkbox '>
    <input type="checkbox" htmlFor="checkbox-1"  value={isChecked}
   onClick={onChangingCheckbox}/>
   
    <label id="checkbox-1">
    I want to receive: <br/>
    You can disable these at any time</label>
    </div>
    {isChecked?(renderCheckboxItems()):("")}
    <h4>WhatsApp Settings:</h4>
    <div className='checkbox'>
    <input type="checkbox" htmlFor="checkbox-1" />
    <label id="checkbox-1">I want to receive important notifications and updates via WhatsApp.</label>
    </div>
   
</div>
)

{/*render Checkbox Container */}


const renderCheckboxItems=()=>(
    <div >
        <div className='checkbox-container'>
            <div className='checkbox'>
    <input type="checkbox" htmlFor="checkbox-1"
   />
    <label id="checkbox-1">Announcements<br/>
    Most important updates on new and exciting products. Sent around once in a month.</label>
    </div>
    </div>
        <div className='checkbox'>
        <input type="checkbox" htmlFor="checkbox-1" 
    />
    <label id="checkbox-1">Feedback<br/>
    Get beta invitations, surveys and feedback forms, for sharing your suggestions. Sent once in a month.</label>
    </div>
    
    <div className='checkbox'>
    <input type="checkbox" htmlFor="checkbox-1" 
   />
    <label id="checkbox-1">Informational<br/>
    Get to know what's the latest through our newsletters, product updates and more! Sent once in a week.</label>
    </div>
   
    </div>
)

{/*render Notifications */}
const renderChangePassword=()=>(
    <div className='password-container-main'>
       <div className="password-reset">
      <form onSubmit={handleSubmit}>
        <div className='current-password-container'>
        <p>Current Password</p>
        <div className='current-password'>
        
          <input
            type="password"
            className='current-password-input'
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21.9196 11.6C19.8996 6.91 16.0996 4 11.9996 4C7.89958 4 4.09958 6.91 2.07958 11.6C2.02452 11.7262 1.99609 11.8623 1.99609 12C1.99609 12.1377 2.02452 12.2738 2.07958 12.4C4.09958 17.09 7.89958 20 11.9996 20C16.0996 20 19.8996 17.09 21.9196 12.4C21.9746 12.2738 22.0031 12.1377 22.0031 12C22.0031 11.8623 21.9746 11.7262 21.9196 11.6ZM11.9996 18C8.82958 18 5.82958 15.71 4.09958 12C5.82958 8.29 8.82958 6 11.9996 6C15.1696 6 18.1696 8.29 19.8996 12C18.1696 15.71 15.1696 18 11.9996 18ZM11.9996 8C11.2085 8 10.4351 8.2346 9.7773 8.67412C9.1195 9.11365 8.60681 9.73836 8.30406 10.4693C8.00131 11.2002 7.9221 12.0044 8.07644 12.7804C8.23078 13.5563 8.61174 14.269 9.17115 14.8284C9.73056 15.3878 10.4433 15.7688 11.2192 15.9231C11.9951 16.0775 12.7994 15.9983 13.5303 15.6955C14.2612 15.3928 14.8859 14.8801 15.3255 14.2223C15.765 13.5645 15.9996 12.7911 15.9996 12C15.9996 10.9391 15.5782 9.92172 14.828 9.17157C14.0779 8.42143 13.0604 8 11.9996 8ZM11.9996 14C11.604 14 11.2173 13.8827 10.8884 13.6629C10.5595 13.4432 10.3032 13.1308 10.1518 12.7654C10.0004 12.3999 9.96084 11.9978 10.038 11.6098C10.1152 11.2219 10.3057 10.8655 10.5854 10.5858C10.8651 10.3061 11.2214 10.1156 11.6094 10.0384C11.9974 9.96126 12.3995 10.0009 12.7649 10.1522C13.1304 10.3036 13.4428 10.56 13.6625 10.8889C13.8823 11.2178 13.9996 11.6044 13.9996 12C13.9996 12.5304 13.7889 13.0391 13.4138 13.4142C13.0387 13.7893 12.53 14 11.9996 14Z" fill="black"/>
</svg>
        </div>
       <p>New Password</p>
          <input
            type="password"
            value={password}
            className='current-password-input'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
         <p>Confirm Password</p>
          <input
            type="password"
            className='current-password-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
       
       
      
      {message && <h5 className='password-error-message'>{message}</h5>}
      <ul>
        <li>Passwords must be a minimum of 10 characters long.</li>
        <li> Passwords must include at least one uppercase letter, one lowercase letter, one number, and one special character. </li>
        <li>Avoid common patterns or sequences, such as "123456" or "password".</li>
        </ul>
     
      <button type="submit" className='btn-confirm'>Confirm</button>
      </form>
    </div>
    </div>
    )

   {/*render main container */} 
    return(
        <div className='setting-container-main'>
                       <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
  <g clip-path="url(#clip0_269_2767)">
    <path d="M23.5698 14.1424L16.4044 21.3078L32.055 21.3078C32.8093 21.3078 33.375 21.8734 33.375 22.6277C33.375 23.3819 32.8093 23.9476 32.055 23.9476L16.4044 23.9476L23.5698 31.113C24.1354 31.6787 24.1354 32.4329 23.5698 32.9986C23.0041 33.5643 22.2498 33.5643 21.6841 32.9986L12.2561 23.5705C12.1618 23.4762 11.9732 23.2877 11.9732 23.0991C11.8789 22.8163 11.8789 22.4391 11.9732 22.1563C11.9732 21.9677 12.1618 21.7792 12.2561 21.6849L21.6841 12.2568C22.2498 11.6911 23.0041 11.6911 23.5698 12.2568C24.1354 12.8225 24.1354 13.5767 23.5698 14.1424Z" fill="#191919"/>
  </g>
  <defs>
    <clipPath id="clip0_269_2767">
      <rect width="32" height="32" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 22.627 45.2549)"/>
    </clipPath>
  </defs>
</svg>
        <div className='setting-container'>
            <h1 >Settings</h1>
 
          
        {/*render button Container */}
        <div className='btn-container'>
        < button   className={activeTab === 'tab1' ? 'active-btn' : 'not-active-btn'} onClick={()=>setActiveTab('tab1')}>Change Password</button>
        <button   className={activeTab === 'tab2' ? 'active-btn' : 'not-active-btn'} onClick={()=>setActiveTab('tab2')}>Notification</button>
        </div>
       { renderContent()}
       </div>
        </div>
    )
}
export default Setting