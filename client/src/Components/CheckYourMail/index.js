import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import the same CSS file used for ResetPassword
import './styleguide.css';
const CheckYourMail = () => {
  return (
    <div className="check-your-mail-container">
      <div className="check-your-mail-content">
      <Link to="/reset-password"> {/* Wrap the arrow with Link */}
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none" className="back-link">
            <g clip-path="url(#clip0_312_190)">
              <path d="M23.5698 14.1422L16.4044 21.3075L32.055 21.3075C32.8093 21.3075 33.375 21.8732 33.375 22.6275C33.375 23.3817 32.8093 23.9474 32.055 23.9474L16.4044 23.9474L23.5698 31.1127C24.1354 31.6784 24.1354 32.4327 23.5698 32.9984C23.0041 33.564 22.2498 33.564 21.6841 32.9984L12.2561 23.5703C12.1618 23.476 11.9732 23.2874 11.9732 23.0989C11.8789 22.816 11.8789 22.4389 11.9732 22.156C11.9732 21.9675 12.1618 21.7789 12.2561 21.6846L21.6841 12.2566C22.2498 11.6909 23.0041 11.6909 23.5698 12.2566C24.1354 12.8222 24.1354 13.5765 23.5698 14.1422Z" fill="#191919"/>
            </g>
            <defs>
              <clipPath id="clip0_312_190">
                <rect width="32" height="32" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 22.627 45.2549)"/>
              </clipPath>
            </defs>
          </svg>
        </Link>
        <div className="check-your-mail-email-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="51" height="52" viewBox="0 0 88 69" fill="none">
            <path d="M0.0124998 13.4469C0.171115 9.82716 1.72073 6.40833 4.33828 3.90315C6.95583 1.39796 10.4393 -0.000252928 14.0625 3.43181e-08H73.4375C77.0607 -0.000252928 80.5442 1.39796 83.1617 3.90315C85.7793 6.40833 87.3289 9.82716 87.4875 13.4469L82.875 16.0094L43.75 37.075L4.625 16.0094L0.0124998 13.4469ZM0 20.5875V54.6875C0 58.4171 1.48158 61.994 4.11881 64.6312C6.75604 67.2684 10.3329 68.75 14.0625 68.75H73.4375C77.1671 68.75 80.744 67.2684 83.3812 64.6312C86.0184 61.994 87.5 58.4171 87.5 54.6875V20.5875L85.8563 21.5031L45.2313 43.3781C44.776 43.6232 44.267 43.7515 43.75 43.7515C43.233 43.7515 42.724 43.6232 42.2687 43.3781L1.60625 21.4812L0 20.5875Z" fill="#FF8A08"/>
          </svg>
        </div>
        <h1 className="check-your-mail-title">Check your mail</h1>
        <p className="check-your-mail-text">We have sent a password reset link.</p>
        <div className="check-your-mail-email-link">
          <Link to="/create-password">
            <button className="check-your-mail-btn">Open Email</button>
          </Link>
        </div>
        <p className="check-your-mail-text1">
          Did not receive the email? Check your <span className="check-your-mail-spam">spam folder</span>.
        </p>
      </div>
    </div>
  );
}

export default CheckYourMail;
