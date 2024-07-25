import React,{useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import ZeroAppointmentsView from '../ZeroAppointmentsView'
// import './index.css'
import UpcomingConsultationItem from './UpcomingConsultationItem/index';
import PreviousConsultationItem from './PreviousConsultationItem';



const MyConsultations = () => {
 const tabsList = [
        {tabId : 'UPCOMING',text : 'Upcoming'},
        {tabId : 'PREVIOUS',text : 'Previous'}
    ]
    
 const upcomingConsultations = [
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            type : 'Middle Management',
            date : 'May 22, 2024',
            time : '16:00pm',
            companyWebite : 'tcs@tcs.com'
        },
    ]
    
 const previousConsultations = [
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : false,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
        {
            id : uuidv4(),
            companyName : 'TCS',
            date : 'May 22, 2024',
            time : '16:00pm',
            isCompleted : true,
            companyWebite : 'tcs@tcs.com'
        },
    ]
 const [activeTab,setActiveTab] = useState(tabsList[0].tabId)
 const [zeroPreviousAppointmentsView,setZeroPreviousAppointmentsView] = useState(false)
 const [zeroUpcomingAppointmentsView,setZeroUpcomingAppointmentsView] = useState(false)
 const [upcomingConsultationsList,setUpcomingConsultationsList] = useState([]);
 const [previousConsultationsList,setPreviousAppointmentsList] = useState([]);
 const [appointments,setAppointments] = useState([]);

 const getConsultations = async() =>{
    try{
        const consultantId = localStorage.getItem('id');
        console.log(consultantId);
        const upcomingConsultationsResponse = await fetch(`http://localhost:5000/consultant/profile/consultations/upcoming/${consultantId}`);
        const previousConsulationsResponse = await fetch(`http://localhost:5000/consultant/profile/consultations/previous/${consultantId}`);
        const upcomingData = await upcomingConsultationsResponse.json();
        setUpcomingConsultationsList(upcomingData.upcomingConsultations)
        const previousData = await previousConsulationsResponse.json();
        setPreviousAppointmentsList(previousData.previousConsultations)
    }catch(e){
        console.log(e);
    }
 }

 useEffect(()=>{
    //appointments callback fetch
    // getConsultations();
 },[])


 const consultantId = localStorage.getItem('id');
 console.log(consultantId);
 const UpcomingAppointmentsView = () =>(
    <div className='user-appointments-list'>
        {upcomingConsultationsList.length ===0 ? (<ZeroAppointmentsView/>) : (
            <>
                {previousConsultationsList.map(e=>(
                    <UpcomingConsultationItem consultationDetails={e}/>
                ))}
                {/** upcomingConsultationsList should be used to get the result */}
            </>
        )}
    </div>
)

const PreviousAppointmentsView = () =>(
    <div className='user-appointments-list'>
        {previousConsultationsList.length>0 ? (<ZeroAppointmentsView/>) : (
            <>
                {previousConsultationsList.map(e=>(
                    <PreviousConsultationItem consultationDetails={e} />
                ))}
                {/**previousConsultationsList should be used here to get the result */}
            </>
        )}
    </div>
) 


  return (
    <div className='user-appointments-bg-container'>
        <div className='user-appointment-header-container'>
            <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1717409075/Solid_arehkl.svg"
                className='user-appointments-arrow-img'
                alt="user-appointments"
            />
            <h1 className='user-appointments-heading'>My Consultations</h1>
        </div>
        <div className="user-appointmnet-container">
            {tabsList.map(e=>(
                <button className={`${activeTab === e.tabId ? 'user-appointment-button user-appointment-button-active' : 'user-appointment-button'}`} id={e.tabId} onClick={()=>setActiveTab(e.tabId)}>{e.text}</button>
            ))}
        </div>
        {activeTab === 'UPCOMING' ? (<UpcomingAppointmentsView/>) : (<PreviousAppointmentsView/>)}
    </div>
  )
}

export default MyConsultations