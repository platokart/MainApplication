import './App.css';
import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from "./Components/ProtectedRoutes";
import { AuthProvider } from "./Context/Auth1";
import process from "process/browser";

import Generalhomepage from './Components/Generalhomepage/Generalhomepage';
import Aboutus from './Components/Aboutuspage';
import Trailplan from './Components/AllPlansDetails/MyPlanTrail'
import Basicplan from './Components/AllPlansDetails/MyPlanTrail/Basicplan';
import Standardplan from './Components/AllPlansDetails/MyPlanTrail/Standardplan';
import Premiumplan from './Components/AllPlansDetails/MyPlanTrail/Premiumplan';
import Setting from './Components/Settings';
import Article from './Components/Articlepage'
//import Navbar from './Components/Navbar/Navbar';
//for user
import UserHomePage from './Components/User/UserHomePage';
import UserSignInPage from './Components/User/UserSignInPage'
import UserSignUpPage from './Components/User/UserSignUpPage'
import UserOtpScreen from './Components/User/UserOtpScreen'
import UserNewAccountPage from './Components/User/UserNewAccountPage'
import UserDetailsForm from './Components/User/UserDetailsForm'
import UserSetPasswordPage from './Components/User/UserSetPasswordPage';
import UserMyAppointments from './Components/UserMyAppointments';
//consultant routes
import ConsultantDetailsForm from './Components/Consultant/ConsultantDetailsForm'
import ConsultantNewAccountPage from './Components/Consultant/ConsultantNewAccountPage'
import ConsultantOTPScreen  from './Components/Consultant/ConsultantOTPScreen'
import ConsultantSigninPage  from './Components/Consultant/ConsultantSigninPage'
import ConsultantSignupPage  from './Components/Consultant/ConsultantSignupPage'
import ConsultantThankyouPage  from './Components/Consultant/ConsultantThankyouPage'
import ConsultantSetPasswordPage from './Components/Consultant/ConsultantSetPasswordPage'
import ConsultantAdditionalDetailsForm from './Components/Consultant/ConsultantAdditionalDetailsForm'
import ConsultantCriticalDetails from './Components/Consultant/ConsultantCriticalDetails';
import ConsultantPaymentDetails from './Components/Consultant/ConsultantPaymentDetails'
import ConsultantAboutus from './Components/Consultant/ConsultantAboutUsPage';
//contact us route
import ContactUs from './Components/ContactUs'
import VideoCallScreenC from './Components/VideoCallScreenC';
import VideoCallScreenU from './Components/VideoCallScreenU';
import ChatScreen from './Components/ChatSystem/ChatScreen';
import ConsultationRequest from './Components/User/UserConsultantRequest';
import ThankYou from './Components/UserThankYou';
import Footer from './Components/FooterSeaWireFooter';
import BuyPremiumMonthly from './Components/UserBuyPremiumMonthly';
import BuyPremiumYearly from './Components/UserBuyPremiumYearly';
import AnimationThankYou from './Components/UserAnimationThankyou';
import GetConsultation from './Components/User/UserGetConsultation';

import ConsultantResetPassword from './Components/Consultant/ConsultantResetPassword';
import ConsultantCheckYourMail from './Components/Consultant/ConsultantCheckYourMail'; 
import ConsultantCreatePassword  from './Components/Consultant/ConsultantCreatePassword';

import UserResetPassword from './Components/User/UserResetPassword';
import UserCheckYourMail from './Components/User/UserCheckYourMail'; 
import UserCreatePassword  from './Components/User/UserCreatePassword';
import ReportAbusePage from './Components/ReportAbuse';
import ReportIssuePage from './Components/ReportIssuePage';
//profile details
import UserProfile from './Components/User/UserProfile';
import ConsultantProfileBasicDetails from './Components/ConsultantProfileBasicDetails';
import UserProfileWithNo from './Components/UserProfileWithNo'
import ConsultantProfile from './Components/ConsultantProfile';
import ConsultantBasicProfileDetailsIncompleteProfile from './Components/ConsultantBasicDetailsIncompletProfile';
import CommunityPanel from './Components/CommunityPanel';
import ConsultantHomePage from './Components/Consultant/ConsultantHomePage';
import NoMatchedConsultantsView from './Components/NoMatchedConsultantsView';
import VideoChat from './VideoChat';
import ButtonComponent from './Components/PaymentComponent';
import ConsultantAccept from './Components/Consultant/ConsultantAccept';
import ConsultantContactUs from './Components/Consultant/ConsultantContactUs/index';
function App() {
  return (
    <>
      <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Generalhomepage/>}/>
        <Route exact path="/user/signin" element={<UserSignInPage/>}/>
        <Route exact path="/user/signup" element={<UserSignUpPage/>}/>
        <Route exact path="/user/otp" element={<UserOtpScreen/>}/>
        <Route exact path="/user/account-page" element={<UserNewAccountPage/>}/>
        <Route exact path="/report-issue" element={<ReportIssuePage/>}/>
        <Route exact path="/report-abuse" element={<ReportAbusePage/>}/>

      
        <Route exact path="/consultant/signin" element={<ConsultantSigninPage/>} />
        <Route exact path="/consultant/signup" element={<ConsultantSignupPage/>} />
        <Route exact path="/consultant/otp" element={<ConsultantOTPScreen/>} />
        <Route exact path="/consultant/account-page" element={<ConsultantNewAccountPage/>} />
        

        <Route exact path='/contactus' element={<ContactUs/>} />
        <Route exact path='/consultant/contactus' element={<ConsultantContactUs/>} />
        <Route exact path="videocall" element={<VideoChat/>} />
        <Route exact path="/mychats" element={<ChatScreen/>} />
       
      
       
        
        <Route exact path="/no-matched-consultants" element={<NoMatchedConsultantsView/>} />
       
       
        
       
    
    
    
        <Route exact path="/aboutus" element={ <Aboutus/>}/>
        <Route exact path="/consultant/aboutus" element={ <ConsultantAboutus/>}/>
        <Route exact path="/plans" element={ <Trailplan/>}/>
        <Route exact path="/basicplan" element={ <Basicplan/>}/>
        <Route exact path="/standardplan" element={ <Standardplan/>}/>
        <Route exact path="/premiumplan" element={ <Premiumplan/>}/>
        <Route exact path="/setting" element={ <Setting/>}/>
        <Route exact path="/aboutus/article/:id"element={<Article/>}/>
        <Route exact path="/video/consultant/:consultantEmail/:customerEmail" element={<VideoCallScreenC/>}/>
        <Route exact path="/video/customer/:customerEmail/:consultantEmail" element={<VideoCallScreenU/>}/>
        <Route exact path="/payment" element={<ButtonComponent/>}/>
        <Route exact path="/accept-consultation" element={<ConsultantAccept/>}/>

        <Route exact  path="/user/reset-password" element={<UserResetPassword/>}/>
          <Route exact path="/user/check-mail" element={<UserCheckYourMail/>} /> 
          <Route path="/user/create-password/:token" element={<UserCreatePassword />} />

          <Route exact  path="/consultant/reset-password" element={<ConsultantResetPassword/>}/>
          <Route exact path="/consultant/check-mail" element={<ConsultantCheckYourMail/>} /> 
          <Route path="/consultant/create-password/:token" element={<ConsultantCreatePassword />} />

        <Route element={<ProtectedRoute userType="user" />}>
       <Route exact path="/user/home-page" element={<UserHomePage/>} />
       <Route exact path="/user/detailsform" element={<UserDetailsForm/>}/>
       <Route exact path="/user/set-password" element={<UserSetPasswordPage/>} />
       <Route exact path="/animation" element={<AnimationThankYou/>}/>
       <Route exact path="/user-profile" element={<UserProfile/>}/>
       <Route path="/seek-consultation/function/:function" element={<GetConsultation />} />
       <Route path="/seek-consultation/expertise/:expertise" element={<GetConsultation />} />
       <Route path="/seek-consultation/industry/:industry" element={<GetConsultation />} />

          <Route exact path="/user/my-appointments" element={<UserMyAppointments/>} />
          <Route exact path="/thankyou" element={<ThankYou/>}/>
          <Route exact path='/profile/no' element={<UserProfileWithNo/>}/>
          <Route path="/seek-consultation" element={<GetConsultation/>} />
          <Route exact path="/buypremium/monthly" element={<BuyPremiumMonthly/>}/>
          <Route exact path="/buypremium/yearly" element={<BuyPremiumYearly/>}/>
        </Route>

        
        <Route element={<ProtectedRoute userType="consultant" />}>
        <Route exact path="/consultant/home-page" element={<ConsultantHomePage/>} />
       <Route exact path="/consultant/detailsform" element={<ConsultantDetailsForm/>} />
       <Route exact path="/consultant/thankyou" element={<ConsultantThankyouPage/>} />
       <Route exact path ="/consultant/set-password" element={<ConsultantSetPasswordPage/>} />
       <Route exact path="/consultant/additional-details" element={<ConsultantAdditionalDetailsForm/>} />
       <Route exact path="/consultant/critical-details" element={<ConsultantCriticalDetails/>} />
       <Route exact path="/consultant/payment-details" element={<ConsultantPaymentDetails/>} />
       <Route exact path="/consultant/basic/profile" element={<ConsultantProfileBasicDetails/>}/>
        <Route exact path='/consultant-to-be-update-profile' element={<ConsultantBasicProfileDetailsIncompleteProfile/>} /> 
       
          <Route exact path="/thankyou" element={<ThankYou/>}/>
          <Route exact path="/consulation/request" element={<ConsultationRequest/>}/>
          <Route exact path='/consultant-profile/:id' element={<ConsultantProfile/>} />
          <Route exact path="/community-panel" element={<CommunityPanel/>} />
      
        </Route>

        

        <Route exact path="/Footer" element={<Footer/>}/>
       
      </Routes>
      </AuthProvider>
      </>
  );
}

export default App;
