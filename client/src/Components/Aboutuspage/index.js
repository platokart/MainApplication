import React, { useEffect, useState } from "react";
import "./index.css";

import { FiLinkedin } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import image1 from "../Assests/image1.png";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import UserNavbar from './../User/UserNavbar/index';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Aboutus = () => {
    const [articles,setArticles] = useState([])
    const navigate = useNavigate();
    const getArticles = async() =>{
        try{
            const response = await fetch("http://localhost:5000/customer/home/about/articles");
            const data = await response.json();
            console.log(data.articles);
            setArticles(data.articles);
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getArticles();
      },[])
      console.log(articles)

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          }
        ]
      };

  return (
    <>
      <UserNavbar />
      <div>
        <div className="homepage">
          {/*Aboutus-top-container*/}
          {/* <div className="welcome-container">
            <div>
              <h1 className="welcome">
                Welcome to Our
                <br />
                <span className="aboutus"> About Us </span>
                Page
              </h1>
              <p className="welcome-para">
                Discover the story behind our success in just one sentence.
              </p>
            </div>
            <div className="img-para-container-1">
              <p className="img-para-1">
                At work or in business, are
                <br /> you in a fix?
              </p>
            </div>
            <div className="image-container">
              <img src={image1} alt="" />
            </div>
            <div className="img-para-container-2">
              <p className="img-para-2">
                Know to ask the right questions,right time!
              </p>
            </div>
          </div> */}
          <div className="welcome-page-container">
            <div className="welcome-page-description-container">
            <h1 className="welcome">
                Welcome to Our
                <br />
                <span className="aboutus"> About Us </span>
                Page
              </h1>
              <p className="welcome-para">
                Discover the story behind our success in just one sentence.
              </p>
            </div>
            <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716120829/Screenshot_2024-05-19_174223_vir8zy.png"
                alt="welcome-page-img"
                className="welcome-page-img"
            />
        </div>

          {/*overview-vision-mission-container*/}
          <div className="welcome-page-below-container">
            <div className="vision-mission-container">
              <div className="company-overview">
                <div className="box-1">
                  <h2>1</h2>
                </div>
                <h1>Company Overview</h1>
                <p>
                  <span>PlatoKart </span>is a revolutionary online platform that
                  provides on-demand real-time management consulting and
                  advisory services. We connect corporate clients with a curated
                  network of highly-qualified functional experts across CXO,
                  Senior Management, and Middle Management levels.
                </p>
              </div>

              <div className="our-vision">
                <div className="box-2">
                  <h2>2</h2>
                </div>
                <h1>Our Vision</h1>
                <p>
                  To empower businesses in India to achieve their full potential
                  by democratizing access to expert advice and guidance through
                  our innovative, real-time online consulting platform.
                </p>
              </div>

              <div className="our-mission">
                <div className="box-3">
                  <h2>3</h2>
                </div>
                <h1>Our Mission</h1>
                <p>
                  PlatoKart is on a mission to dismantle traditional consulting
                  barriers. Our innovative online platform connects businesses
                  with highly-vetted consultants in real-time, enabling them to
                  make critical decisions with speed and confidence. We empower
                  businesses to thrive in a dynamic market by providing
                  on-demand access to the expertise they need, when they need it
                  most.
                </p>
              </div>
            </div>
            <div>
              {/*Several problems */}
              <div className="platokart-several-problems">
                <h1>
                  PlatoKart is tackling several problems in the traditional
                  management consulting and advisory service landscape:
                </h1>
                <ul>
                  <li className="list-item">
                    <span>Limited access and high cost:</span>
                    <span id="plato-problem-span">
                      Traditional consulting firms often require long
                      engagements with hefty upfront fees, making them
                      inaccessible to many businesses, especially startups or
                      those with specific, short-term needs.
                    </span>{" "}
                  </li>
                  <li className="list-item">
                    <span>Inefficiency and lack of flexibility:</span>
                    <span id="plato-problem-span">
                      The traditional model can be slow and inflexible. Finding
                      the right consultant can be time-consuming, and
                      engagements may not perfectly align with a company's
                      specific needs.
                    </span>
                  </li>
                  <li className="list-item">
                    <span>Geographical constraints:</span>{" "}
                    <span id="plato-problem-span">
                      {" "}
                      Traditional consulting firms often operate regionally,
                      limiting client choices and potentially requiring travel
                      costs for both consultant and client.
                    </span>
                  </li>
                </ul>
              </div>
              {/*issues-by-offering*/}
              <div className="issues-by-offering">
                <h1>Syntropy addresses these issues by offering:</h1>
                <ul>
                  <li className="list-item">
                    <span>On-demand, real-time service:</span>{" "}
                    <span id="plato-problem-span">
                      {" "}
                      Companies can get immediate access to expertise (be it
                      business or functional, strategic or transactional) from
                      credible sources (pre-vetted consultants) when needed,
                      without lengthy contracts.
                    </span>
                  </li>

                  <li className="list-item">
                    <span>Wider talent pool:</span>{" "}
                    <span id="plato-problem-span">
                      The online platform removes geographical barriers,
                      allowing companies to connect with a broader network of
                      consultants.
                    </span>
                  </li>

                  <li className="list-item">
                    <span>Cost-effectiveness:</span>{" "}
                    <span id="plato-problem-span">
                      The model allows for more targeted consultations,
                      potentially reducing overall costs for companies.
                    </span>
                  </li>

                  <li className="list-item">
                    <span id="plato-problem-span">
                      {" "}
                      Empowering corporate clients during their times of growth
                      by offering right partners in times of difficulties and
                      doubts.
                    </span>
                  </li>
                </ul>
                <span id="plato-problem-span">
                  In essence, Syntropy aims to democratize access to
                  high-quality management consulting by making it more
                  accessible, flexible, and affordable for businesses of all
                  sizes.
                </span>
              </div>
            </div>

            {/*Big Hairy Goals*/}

            <div className="Big-Hairy-Goals-container">
              <h1>Big Hairy Audacious Goals</h1>

              <div className="timeline-steps">
                <div>
                  <div className="circle">
                    <h4>1</h4>
                  </div>

                  <hr className="horizontal-line" />

                  <div className="step-content">
                    <h4>BHAG 1: Market Domination</h4>
                    <ul>
                      <li>
                        Goal: Become the undisputed leader in India's online
                        consulting market, by reaching an annual revenue run
                        rate of 100 Cr. within 3 years.
                      </li>
                      <li>
                        Impact: Establish Syntropy as the go-to platform for
                        businesses seeking real-time expert advice, fostering
                        trust and industry-wide adoption.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="circle">
                    <h4>2</h4>
                  </div>
                  <hr className="horizontal-line" />
                  <div className="step-content">
                    <h4>BHAG Option 2: Innovation and Expansion</h4>
                    <li>
                      Goal: Develop a revolutionary AI-powered matching system
                      that predicts client needs and instantly connects them
                      with the optimal consultant, achieving a 90% client
                      satisfaction rate
                    </li>
                    <li>
                      Impact: Revolutionize the consulting experience with
                      unparalleled efficiency and accuracy, attracting new users
                      and driving industry standards forward.
                    </li>
                  </div>
                </div>
                <div>
                  <div className="circle">
                    <h4>3</h4>
                  </div>
                  <hr className="horizontal-line" />
                  <div className="step-content">
                    <h4>BHAG Option 3: Democratizing Expertise</h4>
                    <li>
                      Goal: Make real-time consulting accessible to every
                      business in India, regardless of size or location, by
                      achieving a 20% reduction in average consultation fees
                      within 3 years (replace Z with a significant percentage).
                    </li>
                    <li>
                      Impact: Democratize access to expert advice, empowering
                      even small businesses to compete on a level playing field
                      and fostering a more vibrant Indian business ecosystem.
                    </li>
                  </div>
                </div>
              </div>
            </div>

            {/*our offerings */}

            <div className="our-offerings">
              <h1>Our Offerings</h1>

              <h4>Core Services</h4>
              <ul>
                <li className="list-item-offer">
                  <span className="offering-span-head">
                    Real-Time Business Consulting:
                  </span>
                  <span id="offering-span">
                    {" "}
                    Connect clients with experienced consultants for immediate
                    advice and problem-solving across functional, technical, and
                    business domains. This is delivered in real time through our
                    platform over video calls, chat or audio consultation.{" "}
                  </span>
                </li>
              </ul>
              <h4>
                Value-added Offerings: To be offered in the short to medium term
                of 3 months to a year
              </h4>

              <ul>
                <li className="list-item-offer">
                  <span className="offering-span-head">Content library:</span>{" "}
                  <span id="offering-span">
                    {" "}
                    Companies can get immediate access to expertise (be it
                    business or functional, strategic or transactional) from
                    credible sources (pre-vetted consultants) when needed,
                    without lengthy contracts.
                  </span>
                </li>

                <li className="list-item-offer">
                  <span className="offering-span-head">Community forum:</span>{" "}
                  <span id="offering-span">
                    The online platform removes geographical barriers, allowing
                    companies to connect with a broader network of consultants.
                  </span>
                </li>

                <li className="list-item-offer">
                  <span className="offering-span-head">
                    Project-based consulting:
                  </span>{" "}
                  <span id="offering-span">
                    The model allows for more targeted consultations,
                    potentially reducing overall costs for companies.
                  </span>
                </li>

                <li className="list-item-offer">
                  <span className="offering-span-head">
                    Specialized industry expertise::
                  </span>{" "}
                  <span id="offering-span">
                    The model allows for more targeted consultations,
                    potentially reducing overall costs for companies.
                  </span>
                </li>

                <li className="list-item-offer">
                  <span className="offering-span-head">
                    Career-focused Mentoring:
                  </span>{" "}
                  <span id="offering-span">
                    The model allows for more targeted consultations,
                    potentially reducing overall costs for companies.
                  </span>
                </li>

                <li className="list-item-offer">
                  <span className="offering-span-head">Coaching:</span>{" "}
                  <span id="offering-span">
                    The model allows for more targeted consultations,
                    potentially reducing overall costs for companies.
                  </span>
                </li>
              </ul>
            </div>
            <div className="read-articles">
            {/* <Slider {...settings}>
      {articles.map(e => (
        <div className="article-1 article-item" key={e._id} onClick={() => navigate(`article/${e._id}`)}>
          <img src={e.imageUrl} alt={e.title} className="article-image" />
          <div className="article-content-body">
            <h1>{e.title}</h1>
            <p>
              {e.content.length > 100 ? (e.content.substring(0, 100)) : (e.content)}
              <span className="article-read-more-span" onClick={() => navigate(`article/${e._id}`)}> Readmore</span>
            </p>
            <p>{e.createdAt}</p>
          </div>
        </div>
      ))}
    </Slider> */}
            </div>
            {/*Read articles*/}
            <div className="read-article">
              <h1>Read Articles</h1>
              <div className="article-display articles-display">
              {articles.map(e=>(
                  <div className="article-1 article-item" key={e._id} onClick={()=>navigate(`article/${e._id}`)}>
                    <img src={e.imageUrl} alt={e.title} className="article-image" />
                    <div className="article-content-body">
                      <h1>{e.title}</h1>
                      <p>
                        {e.content.length > 100 ? (e.content.substring(0,100)) : (e.content)}
                        <span className="article-read-more-span" onClick={()=>navigate(`article/${e._id}`)}>      Readmore</span>
                      </p>
                      <p>{e.createdAt}</p>
                    </div>
                  </div>
              ))}
              </div>
            </div>
          </div>

          {/*plato-footer-container*/}

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

export default Aboutus;
