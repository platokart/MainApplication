import './index.css'

const Trailplan=()=>(
    <div>
<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none" className='arrow-left-side'>
  <g clip-path="url(#clip0_269_2301)">
    <path d="M23.5698 14.1424L16.4044 21.3078L32.055 21.3078C32.8093 21.3078 33.375 21.8734 33.375 22.6277C33.375 23.3819 32.8093 23.9476 32.055 23.9476L16.4044 23.9476L23.5698 31.113C24.1354 31.6787 24.1354 32.4329 23.5698 32.9986C23.0041 33.5643 22.2498 33.5643 21.6841 32.9986L12.2561 23.5705C12.1618 23.4762 11.9732 23.2877 11.9732 23.0991C11.8789 22.8163 11.8789 22.4391 11.9732 22.1563C11.9732 21.9677 12.1618 21.7792 12.2561 21.6849L21.6841 12.2568C22.2498 11.6911 23.0041 11.6911 23.5698 12.2568C24.1354 12.8225 24.1354 13.5767 23.5698 14.1424Z" fill="#191919"/>
  </g>
  <defs>
    <clipPath id="clip0_269_2301">
      <rect width="32" height="32" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 22.627 45.2549)"/>
    </clipPath>
  </defs>
</svg>

    <div className="my-plan-container">
       
<h1 className='main-heading-my-plan'>My Plan</h1>
<div className="trail-plan-container">
<div className="content-container">
<div className="left-side-content-container">
    <h4>Current Plan</h4>
    <p>Trail</p>
</div>
<div className='right-side-content-container'>
    <h4>Valid Till</h4>
    <div className="img-content-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='image-hand'>
  <path d="M10.666 1.33301C8.82602 1.33301 7.33268 2.82634 7.33268 4.66634C7.33268 6.50634 8.82602 7.99967 10.666 7.99967C12.506 7.99967 13.9993 6.50634 13.9993 4.66634C13.9993 2.82634 12.506 1.33301 10.666 1.33301ZM10.666 6.66634C9.55935 6.66634 8.66602 5.77301 8.66602 4.66634C8.66602 3.55967 9.55935 2.66634 10.666 2.66634C11.7727 2.66634 12.666 3.55967 12.666 4.66634C12.666 5.77301 11.7727 6.66634 10.666 6.66634ZM12.666 10.6663H11.3327C11.3327 9.86634 10.8327 9.14634 10.086 8.86634L5.97935 7.33301H0.666016V14.6663H4.66602V13.7063L9.33268 14.9997L14.666 13.333V12.6663C14.666 11.5597 13.7727 10.6663 12.666 10.6663ZM3.33268 13.333H1.99935V8.66634H3.33268V13.333ZM9.31268 13.6063L4.66602 12.333V8.66634H5.73935L9.61935 10.113C9.84602 10.1997 9.99935 10.4197 9.99935 10.6663C9.99935 10.6663 8.66602 10.633 8.46602 10.5663L6.87935 10.0397L6.45935 11.3063L8.04602 11.833C8.38602 11.9463 8.73935 11.9997 9.09935 11.9997H12.666C12.926 11.9997 13.1593 12.1597 13.266 12.3797L9.31268 13.6063Z" fill="#7C7D80"/>
</svg>
    <p>Free Credit ends</p>
    </div>
    
</div>
</div>
<button className='button-upgrade-plan'>Upgrade Plan</button>
</div>
    </div>
    </div>
)

export default Trailplan