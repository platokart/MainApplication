import {Component} from 'react'
import './FaqItem.css'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
class FaqItem extends Component {
  state = {
    onClickPlus: false,
  }

  onClickingImg = () => {
    this.setState(prevState => ({
      onClickPlus: !prevState.onClickPlus,
    }))
  }

  render() {
    const {faqsList} = this.props
    const {questionText, answerText} = faqsList
    const {onClickPlus} = this.state

    return (
      <>
        <div className="faq-container">
          <div className='faq'>
          <h4>{questionText}</h4>
         
              {onClickPlus ? (
      
             
                 <FaMinusCircle  onClick={this.onClickingImg} />
                
                
              ) : (
               
                
                 <FaPlusCircle  onClick={this.onClickingImg} />
                
              )}
            </div>
            <div>
             {onClickPlus ?  <p className='answer-container'>{answerText}</p> : ''}
       </div>
       </div>
      </>
    )
  }
}

export default FaqItem