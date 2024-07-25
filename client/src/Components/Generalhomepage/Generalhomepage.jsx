import React from "react";
import "./Generalhomepage.css";

import { FiLinkedin } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import image1 from "../Assests/image1.png";
import image2 from "../Assests/image2.png";
import FaqItem from "../FaqItem/FaqItem";

const faqsList = [
  {
    id: 0,
    questionText: "What is “Platokart” and why am I here?",
    answerText:
      "Platokart is your mentor, guide and aide to manifest your thoughts and ideas in your line of business, into affirmative actions. You are here because you are curious and passionate to get answers and get your ideas executed.",
  },
  {
    id: 1,
    questionText: "Is it a chat bot?",
    answerText:
      "No, it is not. Plato will help you get connected with right experts for your nature of query,challenge, and expertise to enable you in your growth journey",
  },
  {
    id: 2,
    questionText: "How do I get started?",
    answerText:
      "Give you details, authenticate your user credentials, complete your profile and GET started",
  },
  {
    id: 3,
    questionText: "What do I need to pay to get started?",
    answerText:
      "Free registration and no payment for first consultation. Flexible options to choose from thereafter.",
  },
  {
    id: 4,
    questionText:
      "Who do I reach if am not satisfied with consultation I have got?",
    answerText:
      "It is unlikely you would go dissatisfied. However should you have very high demands, you are at the right place to experience our expertise. View our testimonials and know about owners of Plato. Please contact us – helpdesk email ID to be created_____",
  },
];

const Generalhomepage = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="homepage">
          {/* <div className="welcome-container">
            <div>
              <h1 className="welcome">
                Welcome to <br />
                <span className="company-name"> Platokart</span>
              </h1>
              <p className="welcome-para">
                Your home for all type of business consultations.
              </p>
              <button>Get Started</button>
            </div>
            <div className="image-container">
              <img src={image1} alt="home-img" />
            </div>
          </div> */}

          <div className="welcome-page-container">
            <div className="welcome-page-description-container">
                <h1 className="welcome-page-heading">Welcome to</h1>
                <h1 className="welcome-page-heading company-name">Platokart</h1>
                <p className="welcome-page-description">Your home for all type of business consultations.</p>
                <div className="welcome-page-btn-container">
                    <button className="welcome-page-button">Get Started</button>
                </div>
            </div>
            <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716120829/Screenshot_2024-05-19_174223_vir8zy.png"
                alt="welcome-page-img"
                className="welcome-page-img"
            />
        </div>

          <div className="get-started-container">
            <h1>Get Started Today And Explore</h1>
            <p>
              As platokart said:"I am the wisest man alive,for I know one thing and
              that is that I know nothing."{" "}
            </p>

            <div className="timeline-steps">
              <div>
                <div className="circle">
                  <h4>1</h4>
                </div>

                <hr className="horizontal-line" />

                <div className="step-content">
                  <h4>
                    Step 1: Account
                    <br /> Setup
                  </h4>
                  <p>
                    Get started with your basic
                    <br /> information and authenticated
                    <br /> credentials
                  </p>
                </div>
              </div>

              <div>
                <div className="circle">
                  <h4>2</h4>
                </div>
                <hr className="horizontal-line" />
                <div className="step-content">
                  <h4>
                    Step 2:
                    <br /> Consultation
                    <br /> Scope
                  </h4>
                  <p>
                    Explore the business areas,
                    <br /> industry or specialties you seek
                    <br /> consultation for
                  </p>
                </div>
              </div>

              <div>
                <div className="circle">
                  <h4>3</h4>
                </div>
                <hr className="horizontal-line" />
                <div className="step-content">
                  <h4>
                    Step 3: Advisor
                    <br /> Selection
                  </h4>
                  <p>
                    Find your match amongst
                    <br /> advisors, pay and get your
                    <br /> thought clarified for action
                  </p>
                </div>
              </div>

              <div>
                <div className="circle">
                  <h4>4</h4>
                </div>
                <hr className="horizontal-line" />
                <div className="step-content">
                  <h4>
                    Step 4: Long-
                    <br />
                    Term Association
                  </h4>
                  <p>
                    Get associated long-term for
                    <br /> all future advisory
                    <br /> engagements
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="consultation-service-container">
            <img
              src={image2}
              alt=""
              className="consultation-service-container-img"
            />
            <div className="service-content">
              <h1>
                Join our Consultation
                <br /> Services
              </h1>
              <button>Schedule a Consultation</button>
            </div>
          </div>

          <div className="testimonials-container">
            <h1>Testimonials</h1>
            <p>
              Read what your satisfied clients have to say about our services.
            </p>
            #some dumyy data put
          </div>

          <div className="faq-container">
            <h1>FAQ</h1>
            {faqsList.map((eachItem) => (
              <FaqItem key={eachItem.id} faqsList={eachItem} />
            ))}
          </div>

          <div className="footer-container">
            <div className="plato-content">
              <h4>Plato</h4>
              <p>
                Online Ondemand Real
                <br />
                Time Consulting
              </p>
              <p>Copyright Plato</p>
            </div>
            <div className="get-in-content">
              <h4>Get In Touch</h4>
              <div className="location-symbol-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C15.87 2 19 5.13 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13 8.13 2 12 2ZM7 9C7 11.85 9.92 16.21 12 18.88C14.12 16.19 17 11.88 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
                    fill="#0071C1"
                  />
                </svg>
                <p>Syntropy Ventures</p>
              </div>
              <div className="help-symbol-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                    fill="#0071C1"
                  />
                </svg>
                <a
                  href="customercare@syntropy.net.in"
                  className="anchor-helpdesk"
                >
                  helpdesk
                </a>
              </div>
            </div>
            <div className="follow-us-content">
              <div className="linkedin-icon">
                <a
                  href="https://www.linkedin.com/company/syntropy-ventures/?viewAsMember=true"
                  className="anchor-linkedin-icon"
                >
                  <FiLinkedin />
                </a>
              </div>
              <p>Follow Us</p>
            </div>
            <div className="newsletter-content">
              <h4>Join a Newsletter</h4>
              <p>Your Email</p>
              <div className="input-email">
                <input type="email" placeholder="Enter Your Email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generalhomepage;
