import React, { useState } from 'react';
import './index.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Rest of the component...

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className= "nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">

            <path d="M27 9H5C4.44772 9 4 9.44772 4 10V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V10C28 9.44772 27.5523 9 27 9Z" stroke="#0071C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3L16 9L22 3" stroke="#0071C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.5 16C24.3284 16 25 15.3284 25 14.5C25 13.6716 24.3284 13 23.5 13C22.6716 13 22 13.6716 22 14.5C22 15.3284 22.6716 16 23.5 16Z" fill="#0071C1"/>
            <path d="M23.5 22C24.3284 22 25 21.3284 25 20.5C25 19.6716 24.3284 19 23.5 19C22.6716 19 22 19.6716 22 20.5C22 21.3284 22.6716 22 23.5 22Z" fill="#0071C1"/>
            <path d="M19 26V9" stroke="#0071C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="logo">
          <span className="name">Logo</span>
        </div>

       
      </div>


      
      <div className="nav-center">
        <ul className="nav-items">
          <li><a href="#">About PLTO</a></li>
          <li><a href="#">Consultation Expertise</a></li>
          <li><a href="#">Get Consultation</a></li>
          <li><a href="#">Just Ask</a></li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.07 16.83L19 14.71C18.5547 14.2868 17.9931 14.0063 17.3872 13.9047C16.7813 13.8032 16.1589 13.8851 15.6 14.14L14.7 13.24C15.7605 11.8229 16.2449 10.0567 16.0555 8.29684C15.8662 6.537 15.0172 4.91423 13.6794 3.7552C12.3417 2.59618 10.6145 1.98696 8.84565 2.05019C7.07678 2.11341 5.39754 2.84439 4.14596 4.09597C2.89438 5.34755 2.1634 7.0268 2.10017 8.79567C2.03695 10.5645 2.64617 12.2917 3.80519 13.6294C4.96421 14.9672 6.58699 15.8162 8.34683 16.0055C10.1067 16.1949 11.8729 15.7106 13.29 14.65L14.18 15.54C13.8951 16.0996 13.793 16.7346 13.8881 17.3553C13.9831 17.9761 14.2706 18.5513 14.71 19L16.83 21.12C17.3925 21.6818 18.155 21.9974 18.95 21.9974C19.745 21.9974 20.5075 21.6818 21.07 21.12C21.3557 20.8406 21.5828 20.5069 21.7378 20.1386C21.8928 19.7702 21.9726 19.3746 21.9726 18.975C21.9726 18.5754 21.8928 18.1798 21.7378 17.8114C21.5828 17.4431 21.3557 17.1094 21.07 16.83ZM12.59 12.59C11.8902 13.288 10.9993 13.7629 10.0297 13.9549C9.06017 14.1468 8.05549 14.047 7.14259 13.6682C6.2297 13.2894 5.44955 12.6485 4.9007 11.8265C4.35185 11.0046 4.05893 10.038 4.05893 9.05C4.05893 8.06163 4.35185 7.09544 4.9007 6.27347C5.44955 5.45149 6.2297 4.81062 7.14259 4.43182C8.05549 4.05301 9.06017 3.95325 10.0297 4.14515C10.9993 4
.33706 11.8902 12.59 5.51C13.0556 5.97446 13.4251 6.52621 13.6771 7.13367C13.9292 7.74112 14.0589 8.39233 14.0589 9.05C14.0589 9.70768 13.9292 10.3589 13.6771 10.9663C13.4251 11.5738 13.0556 12.1255 12.59 12.59ZM19.66 19.66C19.567 19.7537 19.4564 19.8281 19.3346 19.8789C19.2127 19.9297 19.082 19.9558 18.95 19.9558C18.818 19.9558 18.6873 19.9297 18.5654 19.8789C18.4436 19.8281 18.333 19.7537 18.24 19.66L16.12 17.54C16.0263 17.447 15.9519 17.3364 15.9011 17.2146C15.8503 17.0927 15.8242 16.962 15.8242 16.83C15.8242 16.698 15.8503 16.5673 15.9011 16.4454C15.9519 16.3236 16.0263 16.213 16.12 16.12C16.213 16.0263 16.3236 15.9519 16.4454 15.9011C16.5673 15.8503 16.698 15.8242 16.83 15.8242C16.962 15.8242 17.0927 15.8503 17.2146 15.9011C17.3364 15.9519 17.447 16.0263 17.54 16.12L19.66 18.24C19.7537 18.333 19.8281 18.4436 19.8789 18.5654C19.9296 18.6873 19.9558 18.818 19.9558 18.95C19.9558 19.082 19.9296 19.2127 19.8789 19.3346C19.8281 19.4564 19.7537 19.567 19.66 19.66Z" fill="#666666"/>
</svg>
<input type="text" placeholder="Search" />
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4.5 7H19.5M7 12H17M10 17H14" stroke="#7C7D80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<div className="profile-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M10.6667 9.33333C10.6667 7.91885 11.2286 6.56229 12.2288 5.5621C13.229 4.5619 14.5855 4 16 4C17.4145 4 18.771 4.5619 19.7712 5.5621C20.7714 6.56229 21.3333 7.91885 21.3333 9.33333C21.3333 10.7478 20.7714 12.1044 19.7712 13.1046C18.771 14.1048 17.4145 14.6667 16 14.6667C14.5855 14.6667 13.229 14.1048 12.2288 13.1046C11.2286 12.1044 10.6667 10.7478 10.6667 9.33333ZM10.6667 17.3333C8.89856 17.3333 7.20286 18.0357 5.95262 19.286C4.70238 20.5362 4 22.2319 4 24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24C28 22.2319 27.2976 20.5362 26.0474 19.286C24.7971 18.0357 23.1014 17.3333 21.3333 17.3333H10.6667Z" fill="white"/>
</svg>
</div>
<div className="arrow-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

  <path d="M16.707 9.29297L12 13.999L7.29297 9.29297L6.29297 10.293L12 16L17.707 10.293L16.707 9.29297Z" fill="#333333"/>
</svg>
</div>
</div>
</nav>
);
};

export default Navbar;