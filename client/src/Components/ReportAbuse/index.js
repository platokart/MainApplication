import { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import './index.css'
import { v4 as uuidv4 } from 'uuid';

const ReportAbusePage=()=>{
    const {email} = useParams();
    const navigate = useNavigate()
    const options=[
        {label:"hi",id:uuidv4()},
        {label:"hiiiii",id:uuidv4()},
        {label:"bye",id:uuidv4()},
        {label:"hi",id:uuidv4()},
    ]

    const[curText,setTextArea]=useState("")
    const[fullName,setFullName]=useState("")
    const [curabuse, setabuse] = useState("");
    const onSubmittingForm=async(event)=>{
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/video/report/${email}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email,curText,curabuse }),
              
            });
            
            const data = await response.json();
             if(response.ok) {
               //have to redirect to the consultant homepage
               navigate('/consultant/home-page');
             }else{
             }
          } catch (error) {
            console.error("Error:", error);
          }
    }
    return(
        <form onSubmit={onSubmittingForm}>
    <div className="main-container">
        <h1>Report abuse</h1>
        <p>Identify the people in this meeting that you want to report as abusive. Information about the meeting and participants will be sent to Platokart for review.</p>
        <p>Abuse Type</p>
        <select  className="abuse-input-select"
              onChange={(e) => {
                setabuse(e.target.value);
              }}
              value={curabuse}
              id="curabuse">
          {options.map(option=>(
            <option value={option.id}>{option.label}</option>
          ))}
        </select>
        <p>Full name of abuser</p>
        <input type='text' onChange={(e)=>setFullName(e.target.value)} className='name-input-abuse'/>
        <p>Describe your issue</p>
        <textarea placeholder="Type here..." rows="5" cols="35" onChange={(e) => setTextArea(e.target.value)}/>
        <button type="submit">Report</button>
        </div>
        </form>
    )
}
export default ReportAbusePage