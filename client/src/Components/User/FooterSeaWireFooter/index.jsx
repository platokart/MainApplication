// Footer.js
import React from 'react';
import { FiLinkedin } from 'react-icons/fi';
import './index.css'; // Import your CSS file

const Footer = () => {
    return (
        <div className="footer-container">
            <div className='small-container'>
            <div className="plato-content">
                <div className='copy-right-icon'>
                <div className='copy-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32" fill="none">
                        <path d="M19.9031 0.723907C17.2684 0.724093 14.7417 1.78984 12.8787 3.68673C11.0156 5.58362 9.96893 8.1563 9.96875 10.8389V11.0769H0V31.3909H20.2125V20.9469C22.8232 20.8705 25.2993 19.7503 27.1048 17.8288C28.9103 15.9072 29.8998 13.3389 29.8591 10.68C29.8184 8.02101 28.7508 5.48536 26.8875 3.62198C25.0241 1.7586 22.5149 0.717438 19.9031 0.723907ZM3.4375 27.8909V14.5769H9.96875V20.9539H16.775V27.8909H3.4375ZM20.2125 17.4469C20.1094 17.4539 20.0063 17.4539 19.9031 17.4539H13.4062V10.8389C13.4063 9.54402 13.7797 8.27764 14.48 7.19676C15.1803 6.11589 16.1768 5.26805 17.3459 4.75838C18.515 4.2487 19.8053 4.0996 21.0569 4.32956C22.3084 4.55951 23.4662 5.15841 24.3866 6.052C25.307 6.94559 25.9496 8.09458 26.2347 9.35651C26.5197 10.6184 26.4348 11.9378 25.9904 13.1511C25.546 14.3643 24.7616 15.4181 23.7345 16.1817C22.7074 16.9453 21.4828 17.3852 20.2125 17.4469Z" fill="#0071C1"/>
                    </svg>
                </div>
                <div>
                <h3 className='plato'>Plato</h3>
                </div>
                </div>
                <p>Online Ondemand Real<br/>Time Consulting</p>
            
            <div className='copy-right-icon'>
                <div className='copy-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32" fill="none">
                        <path d="M11 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7957 7 13 7H11C10.2044 7 9.44129 7.31607 8.87868 7.87868C8.31607 8.44129 8 9.20435 8 10V14C8 14.7956 8.31607 15.5587 8.87868 16.1213C9.44129 16.6839 10.2044 17 11 17H13C13.7957 17 14.5587 16.6839 15.1213 16.1213C15.6839 15.5587 16 14.7956 16 14C16 13.7348 15.8946 13.4804 15.7071 13.2929C15.5196 13.1054 15.2652 13 15 13C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 13.8946 14.5196 13.7071 14.7071C13.5196 14.8946 13.2652 15 13 15H11C10.7348 15 10.4804 14.8946 10.2929 14.7071C10.1054 14.5196 10 14.2652 10 14V10C10 9.73478 10.1054 9.48043 10.2929 9.29289C10.4804 9.10536 10.7348 9 11 9ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="#7C7D80"/>
                    </svg>
                </div>
                <div>
                    <p>Copyright Plato</p>
                </div>
            </div>
            </div>
            <div className="get-in-content">
                <h4>Get In Touch</h4>
                <div className="location-symbol-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C15.87 2 19 5.13 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13 8.13 2 12 2ZM7 9C7 11.85 9.92 16.21 12 18.88C14.12 16.19 17 11.88 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill="#0071C1"/>
</svg>
<p>Syntropy Ventures</p>
</div>
<div className="help-symbol-content">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#0071C1"/>
</svg>
<a href="mailto:customercare@syntropy.net.in" className='anchor-helpdesk'>helpdesk</a>
</div>
</div>

</div>
<div className='small-container'>
<div className="follow-us-content">
<div className="linkedin-icon">
<a href="https://www.linkedin.com/company/syntropy-ventures/?viewAsMember=true" className='anchor-linkedin-icon'><FiLinkedin  /></a>
</div>
<p>Follow Us</p>
</div>
<div className="newsletter-content">
<h4>Join a Newsletter</h4>
<p>Your Email</p>
<div className="input-email">
<input type="email" placeholder='Enter Your Email' style={{ maxWidth: '90%' }} />
<button>Subscribe</button>
</div>
</div>
</div>
</div>
);
}

export default Footer;
