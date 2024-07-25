import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
// class Navbar extends Component{

//     state = {
//         onClickHambergicon: false,
//       }
    
//       onClickingHambergiconImg = () => {
//         this.setState(prevState => ({
//             onClickHambergicon: !prevState.onClickHambergicon,
//         }))
//       }


    
// }
// }


const Navbar = () => {
  const [onClickHambergicon,setOnClickHambergicon] = useState(false)
  const navigate = useNavigate();
  return(
    <>
    <nav className="navbar">
        <div className="left-content-logo">
        <img src='https://res.cloudinary.com/dgl0v7vwf/image/upload/v1719508464/Plato_Logo-F_lu8fzv.png' alt="plato-kart" style={{height:"100px",width:"100px",borderRadius:"50%"}} />
        </div>
        {onClickHambergicon?
      ( 
      <div className="right-content-buttons">
        <div className='icon-container-tab'>
        <div className='close-icon' onClick={() => setOnClickHambergicon(!onClickHambergicon)}>
       <IoClose className='close-icon' />
       </div>
       <div className='both-btn-tab'>
        <button className="be-a-customer-btn-tab" onClick={()=>navigate('/user/account-page')} >Be a Customer</button>
        <button className="become-a-consultant-btn-tab" onClick={()=>navigate('/consultant/account-page')}>Be a Consultant</button>
        </div>
        </div>
       </div>
      ):(
        <div className="right-content-buttons">
        <button className="signin-btn">SignIn</button>
        <div className='hamberg-icon' onClick={() => setOnClickHambergicon(!onClickHambergicon)}>
       <RxHamburgerMenu />
       </div>
        <button className="be-a-customer-btn" onClick={()=>navigate('/user/account-page')}>Be a Customer</button>
        <button className="become-a-consultant-btn" onClick={()=>navigate('/consultant/account-page')}>Be a Consultant</button>
       
       </div>
      )
    }
    </nav>

    </>
  )
}

export default Navbar