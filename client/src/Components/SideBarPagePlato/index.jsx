import { useState } from "react";
import "./index.css";
import ConsultantProfileRatingDetails from '../ConsultantProfileRatingDetails/ConsultantProfileRatingDetails'
import ConsultantProfileBasicDetails from "../ConsultantProfileBasicDetails";
import UserMyAppointments from '../UserMyAppointments/index';
import MyConsultations from "../MyConsultations/MyConsultations";
import { useNavigate } from "react-router-dom";

const renderMyProfilePage = () => (
    <ConsultantProfileBasicDetails />
);

const renderContractandPolicy = () => (
  <div className="terms-condition-container col-sm-6">
    <div className="terms-conditions-head-container">
      <h1>PlatoKart</h1>
      <p>TERMS AND CONDITIONS</p>
    </div>
    <hr />
    <div className="terms-conditions-content">
      <h2>1. Introduction</h2>
      <p>
        These Terms and Conditions ("Terms") govern the provision of
        consultation services ("Services") by [Your Company Name] ("Company") to
        independent consultants ("Consultants"). By entering into an agreement
        with the Company, Consultants agree to abide by these Terms.
      </p>
      <h2>2. Services Provided</h2>
      <p>The Company will provide the following services to Consultants:</p>
      <ul>
        <li>Platform for connecting with clients.</li>
        <li>Marketing and promotion of Consultant's services.</li>
        <li>Administrative support including invoicing and payment processing.</li>
        <li>Professional development and training resources.</li>
      </ul>
      <h2>3. Consultant Obligations</h2>
      <p>Consultants are required to:</p>
      <ul>
        <li>Provide accurate and complete information about their qualifications and expertise</li>
        <li>Maintain professionalism and integrity in all interactions with clients.</li>
        <li>Deliver services in a timely and competent manner.</li>
        <li>Comply with all applicable laws and regulations.</li>
        <li>Respect the confidentiality of client information.</li>
      </ul>
      <h2>4. Fees and Payment</h2>
      <ul>
        <li>The Company will charge a service fee as a percentage of the fees earned by the Consultant from clients.</li>
        <li>Payment to Consultants will be processed monthly, following receipt of payment from the clients.</li>
        <li>Consultants are responsible for any taxes or other charges applicable to their earnings</li>
      </ul>
      <h2>5. Confidentiality</h2>
      <p>Consultants must:</p>
      <ul>
        <li>Keep all client information confidential and not disclose it to third parties without written consent from the client.</li>
        <li>Use client information only for the purpose of providing Services.</li>
      </ul>
      <h2>6. Intellectual Property</h2>
      <ul>
        <li>Consultants retain ownership of their intellectual property used in providing the Services.</li>
        <li>The Company retains ownership of any intellectual property created or provided by the Company.</li>
      </ul>
      <h2>7. Term and Termination</h2>
      <ul>
        <li>This agreement will commence on the date the Consultant agrees to these Terms and will continue until terminated by either party.</li>
        <li>Either party may terminate this agreement with 30 days written notice.</li>
        <li>The Company may terminate this agreement immediately if the Consultant breaches any of these Terms.</li>
      </ul>
      <h2>8. Limitation of Liability</h2>
      <ul>
        <li>The Company will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the Services.</li>
        <li>The Company's total liability to the Consultant for any damages arising out of or relating to this agreement will not exceed the total fees paid by the Consultant to the Company in the six months preceding the claim</li>
      </ul>
      <h2>9. Indemnification</h2>
      <p>Consultants agree to indemnify and hold harmless the Company from any claims, damages, liabilities, costs, and expenses arising out of or related to:</p>
      <ul>
        <li>Any breach by the Consultant of these Terms.</li>
        <li>Any violation of applicable laws by the Consultant.</li>
        <li>Any claims by clients or third parties related to the Services provided by the Consultant.</li>
      </ul>
      <h2>10. Governing Law</h2>
      <p>These Terms will be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
      <h2>11. Dispute Resolution</h2>
      <ul>
        <li>Any disputes arising out of or relating to these Terms will be resolved through good faith negotiation between the parties.</li>
        <li>If the dispute cannot be resolved through negotiation, it will be settled by binding arbitration under the rules of [Arbitration Organization].</li>
      </ul>
      <h2>12. Amendments</h2>
      <p>The Company reserves the right to amend these Terms at any time. The Company will notify Consultants of any amendments, and continued use of the Services will constitute acceptance of the amended Terms.</p>
      <h2>13. Entire Agreement</h2>
      <p>These Terms constitute the entire agreement between the Company and the Consultant regarding the Services and supersede all prior agreements and understandings, whether written or oral.</p>
      <h2>14. Contact Information</h2>
      <p>For any questions or concerns regarding these Terms, Consultants may contact the Company at</p>
      <p>[Your Company Name]</p>
      <p>[Your Address]</p>
      <p>[Your Email Address]</p>
      <p>[Your Phone Number]</p>
      <p>By agreeing to these Terms, Consultants acknowledge that they have read, understood, and agree to be bound by them.</p>
    </div>
  </div>
);

const renderRatingsandTestimonials = () => (
  <ConsultantProfileRatingDetails />
);

const renderConsultations = () => (
  <div>
    <h1>Consultation page</h1>
    <MyConsultations />
  </div>
);

const SideBarPage = () => {
  const [activeTab, setTabactive] = useState("tab1");
  const navigate = useNavigate();

  const consultantEmail = localStorage.getItem('consultantEmail');
        if(!consultantEmail){
          alert("User Id not found")
          return
        }
  console.log(consultantEmail);


  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return renderMyProfilePage();
      case "tab2":
        return renderContractandPolicy();
      case "tab3":
        return renderRatingsandTestimonials();
      case "tab4":
        return renderConsultations();
      default:
        return null;
    }
  };

  return (
    <div className="sidebar-main-container">
      <div className="sidebar-button-container">
        <button
          className={activeTab === 'tab1' ? 'sidebar-active-btn' : 'sidebar-not-active-btn'}
          onClick={() => setTabactive('tab1')}
        >
          My Profile
        </button>
        <button
          className={activeTab === 'tab2' ? 'sidebar-active-btn' : 'sidebar-not-active-btn'}
          onClick={() => setTabactive('tab2')}
        >
          Contract & Policy
        </button>
        <button
          className={activeTab === 'tab3' ? 'sidebar-active-btn' : 'sidebar-not-active-btn'}
          onClick={() => setTabactive('tab3')}
        >
          Ratings & Testimonials
        </button>
        <button
          className={activeTab === 'tab4' ? 'sidebar-active-btn' : 'sidebar-not-active-btn'}
          onClick={() => {
            setTabactive('tab4');
            navigate('/accept-consultation');
          }}
        >
          Consultations
        </button>
      </div>
      <div className="sidebar-content-pages-container">{renderContent()}</div>
    </div>
  );
};

export default SideBarPage;
