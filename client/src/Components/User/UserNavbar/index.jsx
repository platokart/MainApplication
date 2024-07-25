import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../Context/Auth1";
import { IoClose } from "react-icons/io5";
import "./index.css";

const UserNavbar = () => {
  const [searchInput, setSearchValue] = useState("");
  const [onClickHambergicon, setOnClickHambergicon] = useState(false);
  const [onClickSearchIcon, setOnclickSearchIcon] = useState(false);
  const navigate = useNavigate();
  const menuIcon = onClickHambergicon ? <IoClose /> : <RxHamburgerMenu />;
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("auth");

    // Update the auth context
    setAuth({
      user: null,
      consultant: auth.consultant,
      token: "",
    });

    // Redirect to the signin page
    navigate("/user/signin");
  };
  return (
    <>
      <div className="navbar max-devices">
        <div className="left-content-logo">
          <img
            onClick={()=>navigate('/user/home-page')}
            src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1719508464/Plato_Logo-F_lu8fzv.png"
            alt="plato-kart"
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
          />
        </div>
        <div className="navbar-contents-container">
          <Link className="nav-link" to="/aboutus">
            <p className="navbar-content-menu">About Platokart</p>
          </Link>
          <Link className="nav-link" to="/seek-consultation">
            <p className="navbar-content-menu">Consulation Expertise</p>
          </Link>
          <Link className="nav-link" to="/consulation/request">
            <p className="navbar-content-menu">Get Consultation</p>
          </Link>
          <Link className="nav-link" to="/contactus">
            <p className="navbar-content-menu">Just Ask</p>
          </Link>
        </div>
        <div className="search-profile-container">
          <div className="search-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.07 16.8299L19 14.7099C18.5547 14.2867 17.9931 14.0063 17.3872 13.9047C16.7813 13.8031 16.1589 13.885 15.6 14.1399L14.7 13.2399C15.7605 11.8229 16.2449 10.0566 16.0555 8.29678C15.8662 6.53694 15.0172 4.91417 13.6794 3.75514C12.3417 2.59612 10.6145 1.9869 8.84565 2.05013C7.07678 2.11335 5.39754 2.84433 4.14596 4.09591C2.89438 5.34749 2.1634 7.02674 2.10017 8.79561C2.03695 10.5645 2.64617 12.2916 3.80519 13.6294C4.96421 14.9671 6.58699 15.8161 8.34683 16.0055C10.1067 16.1948 11.8729 15.7105 13.29 14.6499L14.18 15.5399C13.8951 16.0996 13.793 16.7345 13.8881 17.3553C13.9831 17.976 14.2706 18.5513 14.71 18.9999L16.83 21.1199C17.3925 21.6817 18.155 21.9973 18.95 21.9973C19.745 21.9973 20.5075 21.6817 21.07 21.1199C21.3557 20.8405 21.5828 20.5069 21.7378 20.1385C21.8928 19.7702 21.9726 19.3746 21.9726 18.9749C21.9726 18.5753 21.8928 18.1797 21.7378 17.8114C21.5828 17.443 21.3557 17.1093 21.07 16.8299ZM12.59 12.5899C11.8902 13.2879 10.9993 13.7629 10.0297 13.9548C9.06017 14.1467 8.05549 14.0469 7.14259 13.6681C6.2297 13.2893 5.44955 12.6485 4.9007 11.8265C4.35185 11.0045 4.05893 10.0383 4.05893 9.04994C4.05893 8.06157 4.35185 7.09538 4.9007 6.2734C5.44955 5.45143 6.2297 4.81056 7.14259 4.43175C8.05549 4.05294 9.06017 3.95319 10.0297 4.14509C10.9993 4.33699 11.8902 4.81194 12.59 5.50994C13.0556 5.9744 13.4251 6.52615 13.6771 7.13361C13.9292 7.74106 14.0589 8.39227 14.0589 9.04994C14.0589 9.70761 13.9292 10.3588 13.6771 10.9663C13.4251 11.5737 13.0556 12.1255 12.59 12.5899ZM19.66 19.6599C19.567 19.7537 19.4564 19.8281 19.3346 19.8788C19.2127 19.9296 19.082 19.9557 18.95 19.9557C18.818 19.9557 18.6873 19.9296 18.5654 19.8788C18.4436 19.8281 18.333 19.7537 18.24 19.6599L16.12 17.5399C16.0263 17.447 15.9519 17.3364 15.9011 17.2145C15.8503 17.0927 15.8242 16.962 15.8242 16.8299C15.8242 16.6979 15.8503 16.5672 15.9011 16.4454C15.9519 16.3235 16.0263 16.2129 16.12 16.1199C16.213 16.0262 16.3236 15.9518 16.4454 15.9011C16.5673 15.8503 16.698 15.8241 16.83 15.8241C16.962 15.8241 17.0927 15.8503 17.2146 15.9011C17.3364 15.9518 17.447 16.0262 17.54 16.1199L19.66 18.2399C19.7537 18.3329 19.8281 18.4435 19.8789 18.5654C19.9296 18.6872 19.9558 18.8179 19.9558 18.9499C19.9558 19.082 19.9296 19.2127 19.8789 19.3345C19.8281 19.4564 19.7537 19.567 19.66 19.6599Z"
                fill="#7C7D80"
              />
            </svg>

            <input
              type="text"
              className="search-input"
              value={searchInput}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.5 7H19.5M7 12H17M10 17H14"
                stroke="#7C7D80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="profile-main-container">
            <Popup
              trigger={
                <div className="usernavbar-profile-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.6667 9.33333C10.6667 7.91885 11.2286 6.56229 12.2288 5.5621C13.229 4.5619 14.5855 4 16 4C17.4145 4 18.771 4.5619 19.7712 5.5621C20.7714 6.56229 21.3333 7.91885 21.3333 9.33333C21.3333 10.7478 20.7714 12.1044 19.7712 13.1046C18.771 14.1048 17.4145 14.6667 16 14.6667C14.5855 14.6667 13.229 14.1048 12.2288 13.1046C11.2286 12.1044 10.6667 10.7478 10.6667 9.33333ZM10.6667 17.3333C8.89856 17.3333 7.20286 18.0357 5.95262 19.286C4.70238 20.5362 4 22.2319 4 24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24C28 22.2319 27.2976 20.5362 26.0474 19.286C24.7971 18.0357 23.1014 17.3333 21.3333 17.3333H10.6667Z"
                      fill="white"
                    />
                  </svg> 
                   {/* <img
                      src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1721784334/iconamoon_profile-fill_l3fipy.svg"
                    />  */}
                </div>
              }
              position="bottom right"
            >
              <div className="popup-body">
                <li className="popup-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M22.6665 12H9.33315C8.97953 12 8.64039 12.1404 8.39035 12.3905C8.1403 12.6405 7.99982 12.9797 7.99982 13.3333C7.99982 13.6869 8.1403 14.0261 8.39035 14.2761C8.64039 14.5262 8.97953 14.6666 9.33315 14.6666H22.6665C23.0201 14.6666 23.3592 14.5262 23.6093 14.2761C23.8593 14.0261 23.9998 13.6869 23.9998 13.3333C23.9998 12.9797 23.8593 12.6405 23.6093 12.3905C23.3592 12.1404 23.0201 12 22.6665 12ZM17.3332 17.3333H9.33315C8.97953 17.3333 8.64039 17.4738 8.39035 17.7238C8.1403 17.9739 7.99982 18.313 7.99982 18.6666C7.99982 19.0202 8.1403 19.3594 8.39035 19.6094C8.64039 19.8595 8.97953 20 9.33315 20H17.3332C17.6868 20 18.0259 19.8595 18.276 19.6094C18.526 19.3594 18.6665 19.0202 18.6665 18.6666C18.6665 18.313 18.526 17.9739 18.276 17.7238C18.0259 17.4738 17.6868 17.3333 17.3332 17.3333ZM15.9998 2.66663C14.2489 2.66663 12.515 3.0115 10.8974 3.68157C9.2797 4.35163 7.80984 5.33375 6.57173 6.57187C4.07125 9.07235 2.66649 12.4637 2.66649 16C2.65483 19.0788 3.72088 22.0647 5.67982 24.44L3.01315 27.1066C2.82814 27.2941 2.70282 27.5322 2.65298 27.7909C2.60315 28.0495 2.63105 28.3171 2.73315 28.56C2.8439 28.7999 3.02343 29.0015 3.24895 29.1391C3.47447 29.2768 3.73582 29.3444 3.99982 29.3333H15.9998C19.536 29.3333 22.9274 27.9285 25.4279 25.4281C27.9284 22.9276 29.3332 19.5362 29.3332 16C29.3332 12.4637 27.9284 9.07235 25.4279 6.57187C22.9274 4.07138 19.536 2.66663 15.9998 2.66663ZM15.9998 26.6666H7.21315L8.45315 25.4266C8.70149 25.1768 8.84088 24.8389 8.84088 24.4866C8.84088 24.1344 8.70149 23.7964 8.45315 23.5466C6.70727 21.8027 5.62005 19.5073 5.37674 17.0517C5.13343 14.596 5.74908 12.132 7.11879 10.0793C8.4885 8.02668 10.5275 6.51244 12.8885 5.79459C15.2495 5.07674 17.7863 5.1997 20.0668 6.14251C22.3473 7.08532 24.2303 8.78966 25.3951 10.9651C26.5599 13.1406 26.9343 15.6527 26.4547 18.0733C25.975 20.4939 24.6709 22.6734 22.7645 24.2403C20.8582 25.8072 18.4675 26.6647 15.9998 26.6666Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    className="popup-list-content"
                    onClick={() => navigate("/user-profile")}
                  >
                    My Profile
                  </p>
                </li>
                <li className="popup-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M22.6665 12H9.33315C8.97953 12 8.64039 12.1404 8.39035 12.3905C8.1403 12.6405 7.99982 12.9797 7.99982 13.3333C7.99982 13.6869 8.1403 14.0261 8.39035 14.2761C8.64039 14.5262 8.97953 14.6666 9.33315 14.6666H22.6665C23.0201 14.6666 23.3592 14.5262 23.6093 14.2761C23.8593 14.0261 23.9998 13.6869 23.9998 13.3333C23.9998 12.9797 23.8593 12.6405 23.6093 12.3905C23.3592 12.1404 23.0201 12 22.6665 12ZM17.3332 17.3333H9.33315C8.97953 17.3333 8.64039 17.4738 8.39035 17.7238C8.1403 17.9739 7.99982 18.313 7.99982 18.6666C7.99982 19.0202 8.1403 19.3594 8.39035 19.6094C8.64039 19.8595 8.97953 20 9.33315 20H17.3332C17.6868 20 18.0259 19.8595 18.276 19.6094C18.526 19.3594 18.6665 19.0202 18.6665 18.6666C18.6665 18.313 18.526 17.9739 18.276 17.7238C18.0259 17.4738 17.6868 17.3333 17.3332 17.3333ZM15.9998 2.66663C14.2489 2.66663 12.515 3.0115 10.8974 3.68157C9.2797 4.35163 7.80984 5.33375 6.57173 6.57187C4.07125 9.07235 2.66649 12.4637 2.66649 16C2.65483 19.0788 3.72088 22.0647 5.67982 24.44L3.01315 27.1066C2.82814 27.2941 2.70282 27.5322 2.65298 27.7909C2.60315 28.0495 2.63105 28.3171 2.73315 28.56C2.8439 28.7999 3.02343 29.0015 3.24895 29.1391C3.47447 29.2768 3.73582 29.3444 3.99982 29.3333H15.9998C19.536 29.3333 22.9274 27.9285 25.4279 25.4281C27.9284 22.9276 29.3332 19.5362 29.3332 16C29.3332 12.4637 27.9284 9.07235 25.4279 6.57187C22.9274 4.07138 19.536 2.66663 15.9998 2.66663ZM15.9998 26.6666H7.21315L8.45315 25.4266C8.70149 25.1768 8.84088 24.8389 8.84088 24.4866C8.84088 24.1344 8.70149 23.7964 8.45315 23.5466C6.70727 21.8027 5.62005 19.5073 5.37674 17.0517C5.13343 14.596 5.74908 12.132 7.11879 10.0793C8.4885 8.02668 10.5275 6.51244 12.8885 5.79459C15.2495 5.07674 17.7863 5.1997 20.0668 6.14251C22.3473 7.08532 24.2303 8.78966 25.3951 10.9651C26.5599 13.1406 26.9343 15.6527 26.4547 18.0733C25.975 20.4939 24.6709 22.6734 22.7645 24.2403C20.8582 25.8072 18.4675 26.6647 15.9998 26.6666Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    className="popup-list-content"
                    onClick={() => navigate("/mychats")}
                  >
                    My chats
                  </p>
                </li>
                <li className="popup-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M21.3333 18.6666H10.6667C10.313 18.6666 9.97391 18.8071 9.72386 19.0572C9.47381 19.3072 9.33333 19.6463 9.33333 20C9.33333 20.3536 9.47381 20.6927 9.72386 20.9428C9.97391 21.1928 10.313 21.3333 10.6667 21.3333H21.3333C21.687 21.3333 22.0261 21.1928 22.2761 20.9428C22.5262 20.6927 22.6667 20.3536 22.6667 20C22.6667 19.6463 22.5262 19.3072 22.2761 19.0572C22.0261 18.8071 21.687 18.6666 21.3333 18.6666ZM21.3333 13.3333H13.3333C12.9797 13.3333 12.6406 13.4738 12.3905 13.7238C12.1405 13.9739 12 14.313 12 14.6666C12 15.0202 12.1405 15.3594 12.3905 15.6094C12.6406 15.8595 12.9797 16 13.3333 16H21.3333C21.687 16 22.0261 15.8595 22.2761 15.6094C22.5262 15.3594 22.6667 15.0202 22.6667 14.6666C22.6667 14.313 22.5262 13.9739 22.2761 13.7238C22.0261 13.4738 21.687 13.3333 21.3333 13.3333ZM26.6667 5.33329H22.6667V3.99996C22.6667 3.64634 22.5262 3.3072 22.2761 3.05715C22.0261 2.8071 21.687 2.66663 21.3333 2.66663C20.9797 2.66663 20.6406 2.8071 20.3905 3.05715C20.1405 3.3072 20 3.64634 20 3.99996V5.33329H17.3333V3.99996C17.3333 3.64634 17.1929 3.3072 16.9428 3.05715C16.6928 2.8071 16.3536 2.66663 16 2.66663C15.6464 2.66663 15.3072 2.8071 15.0572 3.05715C14.8071 3.3072 14.6667 3.64634 14.6667 3.99996V5.33329H12V3.99996C12 3.64634 11.8595 3.3072 11.6095 3.05715C11.3594 2.8071 11.0203 2.66663 10.6667 2.66663C10.313 2.66663 9.97391 2.8071 9.72386 3.05715C9.47381 3.3072 9.33333 3.64634 9.33333 3.99996V5.33329H5.33333C4.97971 5.33329 4.64057 5.47377 4.39052 5.72382C4.14048 5.97387 4 6.313 4 6.66663V25.3333C4 26.3942 4.42143 27.4116 5.17157 28.1617C5.92172 28.9119 6.93913 29.3333 8 29.3333H24C25.0609 29.3333 26.0783 28.9119 26.8284 28.1617C27.5786 27.4116 28 26.3942 28 25.3333V6.66663C28 6.313 27.8595 5.97387 27.6095 5.72382C27.3594 5.47377 27.0203 5.33329 26.6667 5.33329ZM25.3333 25.3333C25.3333 25.6869 25.1929 26.0261 24.9428 26.2761C24.6928 26.5262 24.3536 26.6666 24 26.6666H8C7.64638 26.6666 7.30724 26.5262 7.05719 26.2761C6.80714 26.0261 6.66667 25.6869 6.66667 25.3333V7.99996H9.33333V9.33329C9.33333 9.68691 9.47381 10.0261 9.72386 10.2761C9.97391 10.5262 10.313 10.6666 10.6667 10.6666C11.0203 10.6666 11.3594 10.5262 11.6095 10.2761C11.8595 10.0261 12 9.68691 12 9.33329V7.99996H14.6667V9.33329C14.6667 9.68691 14.8071 10.0261 15.0572 10.2761C15.3072 10.5262 15.6464 10.6666 16 10.6666C16.3536 10.6666 16.6928 10.5262 16.9428 10.2761C17.1929 10.0261 17.3333 9.68691 17.3333 9.33329V7.99996H20V9.33329C20 9.68691 20.1405 10.0261 20.3905 10.2761C20.6406 10.5262 20.9797 10.6666 21.3333 10.6666C21.687 10.6666 22.0261 10.5262 22.2761 10.2761C22.5262 10.0261 22.6667 9.68691 22.6667 9.33329V7.99996H25.3333V25.3333Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    className="popup-list-content"
                    onClick={() => "/user/my-appointments"}
                  >
                    My Appointments
                  </p>
                </li>
                <li className="popup-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M15.9994 2.66663C13.3623 2.66663 10.7844 3.44861 8.59175 4.9137C6.3991 6.37878 4.69013 8.46116 3.68096 10.8975C2.67179 13.3339 2.40775 16.0147 2.92222 18.6012C3.43669 21.1876 4.70656 23.5633 6.57126 25.428C8.43597 27.2927 10.8117 28.5626 13.3982 29.0771C15.9846 29.5916 18.6655 29.3275 21.1018 28.3184C23.5382 27.3092 25.6205 25.6002 27.0856 23.4076C28.5507 21.2149 29.3327 18.637 29.3327 16C29.3327 14.249 28.9878 12.5152 28.3177 10.8975C27.6477 9.27984 26.6656 7.80998 25.4274 6.57187C24.1893 5.33375 22.7195 4.35163 21.1018 3.68157C19.4841 3.0115 17.7503 2.66663 15.9994 2.66663ZM15.9994 26.6666C13.8897 26.6666 11.8274 26.041 10.0733 24.869C8.31915 23.6969 6.95198 22.031 6.14464 20.0819C5.33731 18.1328 5.12607 15.9881 5.53765 13.919C5.94922 11.8499 6.96512 9.94925 8.45688 8.45749C9.94864 6.96573 11.8493 5.94983 13.9184 5.53825C15.9875 5.12667 18.1322 5.33791 20.0813 6.14524C22.0304 6.95258 23.6963 8.31975 24.8684 10.0739C26.0404 11.828 26.666 13.8903 26.666 16C26.666 18.8289 25.5422 21.542 23.5418 23.5424C21.5414 25.5428 18.8283 26.6666 15.9994 26.6666Z"
                      fill="black"
                    />
                    <path
                      d="M15.9993 14.6667C13.3327 14.6667 13.3327 13.8267 13.3327 13.3333C13.3327 12.84 14.266 12 15.9993 12C17.7327 12 17.8527 12.8533 17.866 13.3333H20.5327C20.5147 12.425 20.188 11.5499 19.6064 10.8519C19.0247 10.154 18.2229 9.67486 17.3327 9.49333V8H14.666V9.45333C11.9993 9.89333 10.666 11.6133 10.666 13.3333C10.666 14.8267 11.3593 17.3333 15.9993 17.3333C18.666 17.3333 18.666 18.24 18.666 18.6667C18.666 19.0933 17.8393 20 15.9993 20C13.546 20 13.3327 18.8533 13.3327 18.6667H10.666C10.666 19.8933 11.546 22.0667 14.666 22.56V24H17.3327V22.56C19.9993 22.1067 21.3327 20.3867 21.3327 18.6667C21.3327 17.1733 20.6393 14.6667 15.9993 14.6667Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    className="popup-list-content"
                    onClick={() => navigate("/basicplan")}
                  >
                    My Plans
                  </p>
                </li>
                <li className="popup-list-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M28.426 12.7333L25.906 11.8933L27.0927 9.51996C27.213 9.27154 27.2532 8.99192 27.2078 8.71966C27.1625 8.4474 27.0337 8.19594 26.8394 7.99996L23.9994 5.15996C23.8023 4.96274 23.5485 4.83224 23.2734 4.7868C22.9984 4.74136 22.716 4.78326 22.466 4.90663L20.0927 6.0933L19.2527 3.5733C19.164 3.31062 18.9956 3.08213 18.7709 2.91963C18.5463 2.75712 18.2766 2.66869 17.9994 2.66663H13.9994C13.7198 2.66591 13.4471 2.75306 13.2198 2.91575C12.9925 3.07845 12.8221 3.30847 12.7327 3.5733L11.8927 6.0933L9.51935 4.90663C9.27093 4.78634 8.99131 4.7461 8.71905 4.79148C8.44679 4.83685 8.19533 4.9656 7.99935 5.15996L5.15935 7.99996C4.96213 8.19698 4.83163 8.45086 4.78619 8.7259C4.74075 9.00094 4.78265 9.28331 4.90602 9.5333L6.09269 11.9066L3.57269 12.7466C3.31001 12.8353 3.08152 13.0037 2.91902 13.2284C2.75651 13.453 2.66808 13.7227 2.66602 14V18C2.6653 18.2795 2.75245 18.5522 2.91514 18.7795C3.07784 19.0068 3.30786 19.1772 3.57269 19.2666L6.09269 20.1066L4.90602 22.48C4.78573 22.7284 4.74549 23.008 4.79087 23.2803C4.83624 23.5525 4.96499 23.804 5.15935 24L7.99935 26.84C8.19637 27.0372 8.45025 27.1677 8.72529 27.2131C9.00033 27.2586 9.2827 27.2167 9.53269 27.0933L11.906 25.9066L12.746 28.4266C12.8355 28.6915 13.0059 28.9215 13.2332 29.0842C13.4605 29.2469 13.7332 29.334 14.0127 29.3333H18.0127C18.2922 29.334 18.5649 29.2469 18.7922 29.0842C19.0195 28.9215 19.1899 28.6915 19.2794 28.4266L20.1194 25.9066L22.4927 27.0933C22.7395 27.2106 23.0164 27.2491 23.2859 27.2038C23.5554 27.1585 23.8044 27.0315 23.9994 26.84L26.8394 24C27.0366 23.8029 27.1671 23.5491 27.2125 23.274C27.258 22.999 27.2161 22.7166 27.0927 22.4666L25.906 20.0933L28.426 19.2533C28.6887 19.1646 28.9172 18.9962 29.0797 18.7716C29.2422 18.5469 29.3306 18.2772 29.3327 18V14C29.3334 13.7204 29.2463 13.4478 29.0836 13.2205C28.9209 12.9932 28.6908 12.8227 28.426 12.7333ZM26.666 17.04L25.066 17.5733C24.6981 17.6926 24.3605 17.8906 24.0768 18.1534C23.793 18.4163 23.5698 18.7377 23.4226 19.0954C23.2755 19.4531 23.2079 19.8386 23.2246 20.225C23.2413 20.6114 23.3419 20.9896 23.5194 21.3333L24.2794 22.8533L22.8127 24.32L21.3327 23.52C20.9908 23.3496 20.6162 23.2547 20.2344 23.2417C19.8526 23.2287 19.4725 23.2978 19.1198 23.4445C18.767 23.5911 18.4499 23.8119 18.1899 24.0917C17.9299 24.3716 17.733 24.7041 17.6127 25.0666L17.0794 26.6666H14.9594L14.426 25.0666C14.3067 24.6987 14.1087 24.3611 13.8459 24.0774C13.583 23.7936 13.2616 23.5704 12.9039 23.4232C12.5462 23.2761 12.1608 23.2085 11.7743 23.2252C11.3879 23.2419 11.0097 23.3425 10.666 23.52L9.14602 24.28L7.67935 22.8133L8.47935 21.3333C8.65681 20.9896 8.75738 20.6114 8.77408 20.225C8.79078 19.8386 8.72322 19.4531 8.57607 19.0954C8.42893 18.7377 8.20572 18.4163 7.92195 18.1534C7.63817 17.8906 7.30061 17.6926 6.93269 17.5733L5.33269 17.04V14.96L6.93269 14.4266C7.30061 14.3073 7.63817 14.1093 7.92195 13.8465C8.20572 13.5837 8.42893 13.2622 8.57607 12.9045C8.72322 12.5468 8.79078 12.1614 8.77408 11.7749C8.75738 11.3885 8.65681 11.0103 8.47935 10.6666L7.71935 9.18663L9.18602 7.71996L10.666 8.47996C11.0097 8.65742 11.3879 8.75799 11.7743 8.77469C12.1608 8.79139 12.5462 8.72383 12.9039 8.57668C13.2616 8.42954 13.583 8.20633 13.8459 7.92256C14.1087 7.63878 14.3067 7.30122 14.426 6.9333L14.9594 5.3333H17.0394L17.5727 6.9333C17.692 7.30122 17.89 7.63878 18.1528 7.92256C18.4157 8.20633 18.7371 8.42954 19.0948 8.57668C19.4525 8.72383 19.8379 8.79139 20.2244 8.77469C20.6108 8.75799 20.989 8.65742 21.3327 8.47996L22.8527 7.71996L24.3194 9.18663L23.5194 10.6666C23.349 11.0086 23.2541 11.3831 23.2411 11.7649C23.2281 12.1467 23.2972 12.5268 23.4439 12.8795C23.5905 13.2323 23.8113 13.5494 24.0911 13.8094C24.371 14.0694 24.7035 14.2663 25.066 14.3866L26.666 14.92V17.04ZM15.9994 10.6666C14.9445 10.6666 13.9134 10.9794 13.0363 11.5655C12.1593 12.1515 11.4757 12.9844 11.072 13.959C10.6683 14.9335 10.5627 16.0059 10.7685 17.0404C10.9743 18.075 11.4822 19.0253 12.2281 19.7712C12.974 20.5171 13.9243 21.025 14.9589 21.2308C15.9934 21.4366 17.0658 21.331 18.0403 20.9273C19.0149 20.5237 19.8478 19.8401 20.4339 18.963C21.0199 18.0859 21.3327 17.0548 21.3327 16C21.3327 14.5855 20.7708 13.2289 19.7706 12.2287C18.7704 11.2285 17.4138 10.6666 15.9994 10.6666ZM15.9994 18.6666C15.4719 18.6666 14.9564 18.5102 14.5178 18.2172C14.0793 17.9242 13.7375 17.5077 13.5357 17.0205C13.3338 16.5332 13.281 15.997 13.3839 15.4797C13.4868 14.9624 13.7408 14.4873 14.1137 14.1143C14.4867 13.7414 14.9618 13.4874 15.4791 13.3845C15.9964 13.2816 16.5326 13.3344 17.0198 13.5363C17.5071 13.7381 17.9236 14.0799 18.2166 14.5184C18.5096 14.957 18.666 15.4725 18.666 16C18.666 16.7072 18.3851 17.3855 17.885 17.8856C17.3849 18.3857 16.7066 18.6666 15.9994 18.6666Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    className="popup-list-content"
                    onClick={() => navigate("/setting")}
                  >
                    Settings
                  </p>
                </li>
                <li className="popup-list-item" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M5.33398 16C5.33398 16.3536 5.47446 16.6927 5.72451 16.9428C5.97456 17.1928 6.3137 17.3333 6.66732 17.3333H16.7873L13.7207 20.3866C13.5957 20.5106 13.4965 20.658 13.4288 20.8205C13.3611 20.983 13.3263 21.1573 13.3263 21.3333C13.3263 21.5093 13.3611 21.6836 13.4288 21.8461C13.4965 22.0085 13.5957 22.156 13.7207 22.28C13.8446 22.4049 13.9921 22.5041 14.1545 22.5718C14.317 22.6395 14.4913 22.6744 14.6673 22.6744C14.8433 22.6744 15.0176 22.6395 15.1801 22.5718C15.3426 22.5041 15.49 22.4049 15.614 22.28L20.9473 16.9466C21.0687 16.8198 21.1639 16.6703 21.2273 16.5066C21.3607 16.182 21.3607 15.8179 21.2273 15.4933C21.1639 15.3296 21.0687 15.1801 20.9473 15.0533L15.614 9.71996C15.4897 9.59564 15.3421 9.49703 15.1797 9.42975C15.0172 9.36247 14.8431 9.32784 14.6673 9.32784C14.4915 9.32784 14.3174 9.36247 14.155 9.42975C13.9926 9.49703 13.845 9.59564 13.7207 9.71996C13.5963 9.84428 13.4977 9.99186 13.4304 10.1543C13.3632 10.3167 13.3285 10.4908 13.3285 10.6666C13.3285 10.8424 13.3632 11.0165 13.4304 11.179C13.4977 11.3414 13.5963 11.489 13.7207 11.6133L16.7873 14.6666H6.66732C6.3137 14.6666 5.97456 14.8071 5.72451 15.0572C5.47446 15.3072 5.33398 15.6463 5.33398 16ZM22.6673 2.66663H9.33398C8.27312 2.66663 7.2557 3.08805 6.50556 3.8382C5.75541 4.58834 5.33398 5.60576 5.33398 6.66663V10.6666C5.33398 11.0202 5.47446 11.3594 5.72451 11.6094C5.97456 11.8595 6.3137 12 6.66732 12C7.02094 12 7.36008 11.8595 7.61013 11.6094C7.86017 11.3594 8.00065 11.0202 8.00065 10.6666V6.66663C8.00065 6.313 8.14113 5.97387 8.39118 5.72382C8.64122 5.47377 8.98036 5.33329 9.33398 5.33329H22.6673C23.0209 5.33329 23.3601 5.47377 23.6101 5.72382C23.8602 5.97387 24.0007 6.313 24.0007 6.66663V25.3333C24.0007 25.6869 23.8602 26.0261 23.6101 26.2761C23.3601 26.5262 23.0209 26.6666 22.6673 26.6666H9.33398C8.98036 26.6666 8.64122 26.5262 8.39118 26.2761C8.14113 26.0261 8.00065 25.6869 8.00065 25.3333V21.3333C8.00065 20.9797 7.86017 20.6405 7.61013 20.3905C7.36008 20.1404 7.02094 20 6.66732 20C6.3137 20 5.97456 20.1404 5.72451 20.3905C5.47446 20.6405 5.33398 20.9797 5.33398 21.3333V25.3333C5.33398 26.3942 5.75541 27.4116 6.50556 28.1617C7.2557 28.9119 8.27312 29.3333 9.33398 29.3333H22.6673C23.7282 29.3333 24.7456 28.9119 25.4957 28.1617C26.2459 27.4116 26.6673 26.3942 26.6673 25.3333V6.66663C26.6673 5.60576 26.2459 4.58834 25.4957 3.8382C24.7456 3.08805 23.7282 2.66663 22.6673 2.66663Z"
                      fill="black"
                    />
                  </svg>
                  <p className="popup-list-content" onClick={handleLogout}>Log out</p>
                </li>
              </div>
            </Popup>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.9997 9.16994C16.8123 8.98369 16.5589 8.87915 16.2947 8.87915C16.0305 8.87915 15.7771 8.98369 15.5897 9.16994L11.9997 12.7099L8.4597 9.16994C8.27234 8.98369 8.01889 8.87915 7.7547 8.87915C7.49052 8.87915 7.23707 8.98369 7.0497 9.16994C6.95598 9.26291 6.88158 9.37351 6.83081 9.49537C6.78004 9.61723 6.75391 9.74793 6.75391 9.87994C6.75391 10.012 6.78004 10.1427 6.83081 10.2645C6.88158 10.3864 6.95598 10.497 7.0497 10.5899L11.2897 14.8299C11.3827 14.9237 11.4933 14.9981 11.6151 15.0488C11.737 15.0996 11.8677 15.1257 11.9997 15.1257C12.1317 15.1257 12.2624 15.0996 12.3843 15.0488C12.5061 14.9981 12.6167 14.9237 12.7097 14.8299L16.9997 10.5899C17.0934 10.497 17.1678 10.3864 17.2186 10.2645C17.2694 10.1427 17.2955 10.012 17.2955 9.87994C17.2955 9.74793 17.2694 9.61723 17.2186 9.49537C17.1678 9.37351 17.0934 9.26291 16.9997 9.16994Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      <>
        <div className="medium-devices navbar-mobiles">
          {onClickSearchIcon ? (
            <>
              <div className="navbar-mobile-contents-container">
                <button
                  className="hamburger-icon-btn"
                  onClick={() => setOnclickSearchIcon(false)}
                >
                  <FaArrowLeft />
                </button>
              </div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input-mobile-devices"
              />
            </>
          ) : (
            <>
              <div className="navbar-mobile-contents-container">
                <button
                  className="hamburger-icon-btn"
                  onClick={() => setOnClickHambergicon(!onClickHambergicon)}
                >
                  {menuIcon}
                </button>
                <h3 className="navbar-logo-name">Platokart</h3>
              </div>
              <button
                className="search-icon-btn"
                onClick={() => setOnclickSearchIcon(true)}
              >
                <IoIosSearch />
              </button>
            </>
          )}
        </div>
        {onClickHambergicon && (
          <div className="navbar-mobile-menus-container">
            <Link className="nav-link" to="/aboutus">
              <p className="navbar-content-menu">About Platokart</p>
            </Link>
            <Link className="nav-link" to="/seek-consultation">
              <p className="navbar-content-menu">Consulation Expertise</p>
            </Link>
            <Link className="nav-link" to="/consulation/request">
              <p className="navbar-content-menu">Get Consultation</p>
            </Link>
            <Link className="nav-link" to="/contactus">
              <p className="navbar-content-menu">Just Ask</p>
            </Link>
          </div>
        )}
      </>
    </>
  );
};

export default UserNavbar;
