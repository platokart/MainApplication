import React,{useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'
import UserNavbar from "./../UserNavbar/index";
import UserFooter from "./../UserFooter/index";
import image1 from "../../Assests/image1.png";
import image2 from "../../Assests/image2.png";
import './index.css'
import { useNavigate } from "react-router-dom";

const industries = [
    {
        id : uuidv4(),
        industry : 'Pharma / Healthcare',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123045/streamline_pharmacy-solid_jrp8jb.svg'
      },
      {
        id : uuidv4(),
        industry : 'Start ups',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123036/streamline_startup-solid_avxsiv.svg'
      },
      {
        id : uuidv4(),
        industry : 'Infrastructure',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123030/streamline_industry-innovation-and-infrastructure-solid_dce3cd.svg'
      },
      {
        id : uuidv4(),
        industry : 'Retail and E comm',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123023/fluent_building-retail-20-filled_xcptvo.svg'
      },
      {
        id : uuidv4(),
        industry : 'Energy',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123013/ic_sharp-energy-savings-leaf_iszvjo.svg'
      },
      {
        id : uuidv4(),
        industry : 'Real Estate',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716123006/material-symbols_real-estate-agent-sharp_juwcqc.svg'
      },
      {
        id : uuidv4(),
        industry : 'Education',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122999/zondicons_education_tjr6az.svg'
      },
      {
        id : uuidv4(),
        industry : 'Manufacturing',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122991/material-symbols_manufacturing_tppa5y.svg'
      },
      {
        id : uuidv4(),
        industry : 'Chemicals',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122986/game-icons_chemical-drop_qrhwpl.svg'
      },
      {
        id : uuidv4(),
        industry : 'Aviation',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122980/ri_plane-fill_lmgd7p.svg'
      },
      {
        id : uuidv4(),
        industry : 'Automotive',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122975/mdi_car_mnqndy.svg'
      },
      {
        id : uuidv4(),
        industry : 'Banking, Insurance & NBFC',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122968/mingcute_bank-fill_u45cnw.svg'
      },
      {
        id : uuidv4(),
        industry : 'Technology - Food Tech, EdTech, Fintech, HRTech',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122961/streamline_ai-technology-spark-solid_wcnmku.svg'
      },
      {
        id : uuidv4(),
        industry : 'FMCG / Durables',
        imgUrl : 'https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122954/ph_bag-fill_isrtpo.svg'
      },
]

const functions = [
    {
        id : uuidv4(),
        func : 'HR'
      },
      {
        id : uuidv4(),
        func : 'Legal'
      },
      {
        id : uuidv4(),
        func : 'Finance & Accounts/Taxation'
      },
      {
        id : uuidv4(),
        func : 'Company Secretarial'
      },
      {
        id : uuidv4(),
        func : 'Information Technology'
      },
      {
        id : uuidv4(),
        func : 'Risk & Compliance'
      },
      {
        id : uuidv4(),
        func : 'Sales and Marketing'
      },
      {
        id : uuidv4(),
        func : 'Operations'
      },
      {
        id : uuidv4(),
        func : 'Customer Service'
      },
      {
        id : uuidv4(),
        func : 'Project Management'
      },
]

const minimumFunctions = [
  {
    id : uuidv4(),
    func : 'HR'
  },
  {
    id : uuidv4(),
    func : 'Legal'
  },
  {
    id : uuidv4(),
    func : 'Finance & Accounts/Taxation'
  },
  {
    id : uuidv4(),
    func : 'Company Secretarial'
  },
]


const expertises = [
    {
        id : uuidv4(),
        expertise : 'Markets/Growth',
    },
    {
        id : uuidv4(),
        expertise : 'Change Management',
    },
    {
        id : uuidv4(),
        expertise : 'Innovation',
    },
    {
        id : uuidv4(),
        expertise : 'Lean / Six Sigma',
    },
    {
        id : uuidv4(),
        expertise : 'Logitics & Supply chain',
    },
    {
        id : uuidv4(),
        expertise : 'Talent Management and Organizaional Development',
    },
    {
        id : uuidv4(),
        expertise : 'HR lifecycle services',
    },   
    {
        id : uuidv4(),
        expertise : 'Leadership Development',
    },
    {
        id : uuidv4(),
        expertise : 'Coaching',
    },
    {
        id : uuidv4(),
        expertise : 'Enterprise architecture',
    },
    {
        id : uuidv4(),
        expertise : 'Digital Transformation',
    },
    {
        id : uuidv4(),
        expertise : 'Cloud consulting',
    },
    {
        id : uuidv4(),
        expertise : 'Cyber security',
    },

]

const minimumExpertise = [
  {
    id : uuidv4(),
    expertise : 'Markets/Growth',
},
{
    id : uuidv4(),
    expertise : 'Change Management',
},
{
    id : uuidv4(),
    expertise : 'Innovation',
},
{
    id : uuidv4(),
    expertise : 'Lean / Six Sigma',
},
]

const UserHomePage = () => {
    const [userEmail,setUserEmail] = useState("")
    const [viewAllClicked,setViewAllClicked] = useState(false)
    const onSubmitUserEmail = (e)=>{
        e.preventDefault();
    }
    const navigate=useNavigate();

    const handleExplore = async() => {
      console.log("button clicked");
      try{
        const userId = localStorage.getItem('id');
        if(!userId){
          alert("User Id not found")
          return
        }
         console.log(userId)
        const response = await fetch(`http://localhost:5000/customer/home/explore/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary headers like authentication tokens
          },
        });
        if(response.ok===true){
          console.log(response);
          const data = await response.json()
          if(response.status === 200){
            console.log(data)
            navigate('/consulation/request');
          }else if(response.status === 202){
            navigate('/buypremium/monthly')
          }
        }
      }catch(e){
        console.log(e);
      }
    }

    // useEffect(()=>{
    //   handleExplore();
    // },[])

    

    const viewTxt = viewAllClicked ? 'Show less' : 'View all'
    
    const resultantFunctionBasedList = viewAllClicked ? functions : minimumFunctions
    const resultantExpertiseBasedList = viewAllClicked ? expertises : minimumExpertise

  return (
    <div className="main-home-bg-container">
      <UserNavbar />
      {/**welcome page */}
        <div className="welcome-page-container">
            <div className="welcome-page-description-container">
                <h1 className="welcome-page-heading">Welcome to</h1>
                <h1 className="welcome-page-heading company-name">Platokart</h1>
                <p className="welcome-page-description">Your home for all type of business consultations.</p>
                <div className="welcome-page-btn-container">
                <button className="welcome-page-button" onClick={() => handleExplore()} type="button">Explore</button>                    <img
                        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716121776/Outline_rnox9v.svg"
                        alt="video-icon"
                        className="welcome-page-video-icon"
                    />
                </div>
            </div>
            <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716120829/Screenshot_2024-05-19_174223_vir8zy.png"
                alt="welcome-page-img"
                className="welcome-page-img"
            />
        </div>
      {/**industry based */}
        <div className="industry-based-consultation-container">
            <h1 className="industry-based-heading">Industries based consultation</h1>
            <div className="consultation-types-list">
                    {industries.map((i)=>(
                        <div className="industry-type-card" key={i.id}>
                                <img
                                    className="industry-type-img"
                                    src={i.imgUrl}
                                    alt={i.industry}
                                    onClick={() => navigate(`/seek-consultation/industry/${encodeURIComponent(i.industry)}`)} />
                            <h5 className="industry-name">{i.industry}</h5>
                        </div>
                    ))}
            </div>
        </div>
      {/**function based */}
        <div className="function-based-consultation-container">
            <div className="function-card">
                <h1 className="function-based-consultation-heading">Functional based consultation</h1>
                <button className="view-all-btn" onClick={()=>(setViewAllClicked(!viewAllClicked))}>{viewTxt}</button>
            </div>
            <div className="consultation-types-list">
                    {resultantFunctionBasedList.map(each =>(
                        <div className="function-card-type" key={each.id}>
                            <img
                                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122797/125d70e4bd21d8f0bba22fd3dcb1285f_j0oicq.jpg"
                                alt={each.func}
                                className="function-image"
                            />
                            <h5 className="function-name">{each.func}</h5>
                            <button 
                className="function-card-btn" 
                onClick={() => navigate(`/seek-consultation/function/${encodeURIComponent(each.func)}`)}
            >
                Consult now
            </button>
                        </div>
                    ))}
            </div>
        </div>
      {/** expertise based */}
        <div className="function-based-consultation-container">
            <div className="function-card">
                <h1 className="function-based-consultation-heading">Expertise based consultation</h1>
                <button className="view-all-btn" onClick={()=>(setViewAllClicked(!viewAllClicked))}>{viewTxt}</button>
            </div>
            <div className="consultation-types-list">
                    {resultantExpertiseBasedList.map(each =>(
                        <div className="function-card-type" key={each.id}>
                            <img
                                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122797/125d70e4bd21d8f0bba22fd3dcb1285f_j0oicq.jpg"
                                alt={each.expertise}
                                className="function-image"
                            />
                            <h5 className="function-name">{each.expertise}</h5>
                            <button 
                className="function-card-btn"
                onClick={() => navigate(`/seek-consultation/expertise/${encodeURIComponent(each.expertise)}`)}
            >
                Consult now
            </button>
                        </div>
                    ))}
            </div>
        </div>
      {/** andrioid app download */}
        <div className="android-download-container">
            <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716122872/Screenshot_2024-05-19_181730_l3sncl.png"
                alt="mobile-img"
                className="mobile-img"
            />
            <div className="android-download-contents-container">
                    <h1 className="android-download-heading">Get <span className="android-download-span">Practo</span> App</h1>
                    <p className="android-download-description">We will send you a link, open it on your phone to download the app.</p>
                    <form onSubmit={onSubmitUserEmail} className="android-download-email-container">
                        <input
                            placeholder="Enter your email"
                            className="email-input-el"
                            type="email"
                            onChange={(e)=>setUserEmail(e.target.value)}
                            value={userEmail}
                        />
                        <button className="share-link-button" type="submit">Share App Link</button>
                    </form>
                    <div className="android-download-card">
                        <div className="andorid-playstore-container">
                            <p className="android-download-description">Download from</p>
                            <img
                                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716133907/Screenshot_2024-05-19_211650_re6yoh.png"
                                alt="playstore"
                                className="android-option-img"
                            />
                            <img
                                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716133916/Screenshot_2024-05-19_211707_p8lxfu.png"
                                alt="applestore"
                                className="android-option-img"
                            />
                        </div>
                        <div className="android-scanner-container">
                            <p className="android-download-description">Scan the QR</p>
                            <img
                                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716133926/Screenshot_2024-05-19_212117_k2zgey.png"
                                alt="plato-QR"
                                className="qr-img"
                            />
                        </div>
                    </div>
            </div>
        </div>
        
      <UserFooter />
    </div>
  );
};

export default UserHomePage;
