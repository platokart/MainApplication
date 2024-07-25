import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.css';

Modal.setAppElement('#root'); // This is important for accessibility reasons

const ScheduledConsultationPopup = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { consultantId } = props;
  console.log(props)
  console.log("consult now:",props.cls)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('customerId');
      
      // Combine date and time
      const combinedDateTime = new Date(`${date}T${time}:00`);
      const formattedDateTime = combinedDateTime.toISOString();
      
      const response = await fetch(
        `http://localhost:5000/customer/home/get-consultation/${userId}/view-details/${consultantId}/consult-now`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dateTime: formattedDateTime }),
        }
      );
      if (response.ok) {
        console.log(await response.json());
      } else {
        console.error('Failed to schedule consultation', response.statusText);
      }
    } catch (e) {
      console.error('Error during scheduling consultation', e);
    }
    closeModal();
  };

  return (
    <div className="schedule-consultation-popup-bg-container">
      <button className={`${props.cls !== undefined ? props.cls : 'schedule-consultation-popup-button'}`} onClick={openModal}>Consult Now</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Date and Time Picker"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h3 className="schedule-consultation-popup-heading">Pick a Date and Time</h3>
        <form onSubmit={handleSubmit} className='schedule-consultation-popup-form-con'>
          <div className='schedule-consultation-popup-card'>
            <label className='schedule-consultation-popup-label' htmlFor="date">
                Date:
            </label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                id="date"
                className="schedule-consultation-popup-input"
                />
          </div>
          <div className='schedule-consultation-popup-card'>
            <label className='schedule-consultation-popup-label' htmlFor="time">
                Time:
            </label>
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                id="time"
                className="schedule-consultation-popup-input"
                />
          </div>
          
          <div className='schedule-consultation-popup-buttons-container'>
            <button type="submit" className='schedule-consultation-popup-button'>Submit</button>
            <button type="button" onClick={closeModal} className="schedule-consultation-popup-button">
                Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ScheduledConsultationPopup;
