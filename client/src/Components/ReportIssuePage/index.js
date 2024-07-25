import { useState } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
//import {uploadimg} from './Components/Assests'

const ReportIssuePage=()=>{

    const options=[
        {label:"hi",id:uuidv4()},
        {label:"hi",id:uuidv4()},
        {label:"bye",id:uuidv4()},
        {label:"hi",id:uuidv4()},
    ]
    const {email} = useParams()
    const navigate =  useNavigate();
    const[curText,setTextArea]=useState("")
    const[image,setImage]=useState('')
    const[check,setchecked]=useState(true)
    const [issue, setIssue] = useState("");
    const handleImage=(event)=>{
        setImage(event.target.value)
    }
    const handlechange=async()=>{
       setchecked((prevState)=>!check)
       try {
        const response = await fetch(`http://localhost:5000/video/report-issue/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email,curText}),
          
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
    <div className="main-container">
        <h1>Report an issue</h1>
        <p>When you noticed this issue, what were you trying to do?</p>
        <select  className="issue-input-select"
              onChange={(e) => {
                setIssue(e.target.value);
              }}
              value={issue}
              id="issue">
          {options.map(option=>(
            <option value={option.id}>{option.label}</option>
          ))}
        </select>
        <p>Describe your issue</p>
        <textarea placeholder="Type here..." rows="5" cols="35" onChange={(e) => setTextArea(e.target.value)}/>
        <p>Upload a screenshot</p>

        <div className='upload-container'>
            <div>
            <img src="" alt="img-upload" />
            <input type="file" onChange={handleImage}/>
<p>Click to upload</p>
</div>
        </div>
        <div>
            <input type="checkbox" htmlFor="input-checkbox" value={check} onChange={()=>handlechange()}/>
       <label id="input-checkbox"> We may email you for more information or updates</label>
        </div>
        <button>Send</button>
        </div>
    )
}
export default ReportIssuePage