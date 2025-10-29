class BookingCalendar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .booking-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .booking-modal.active {
          opacity: 1;
          pointer-events: all;
        }
        .booking-container {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        h2 {
          margin-top: 0;
          color: #1e3a8a;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }
        .calendar {
          margin: 1rem 0;
        }
        .time-slots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin: 1rem 0;
        }
        .time-slot {
          padding: 0.5rem;
          background: #f3f4f6;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .time-slot:hover, .time-slot.selected {
          background: #1e3a8a;
          color: white;
        }
        .submit-btn {
          background: #1e3a8a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          width: 100%;
          margin-top: 1rem;
        }
        .submit-btn:hover {
          background: #1e40af;
        }
        @media (max-width: 768px) {
          .time-slots {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      
      <div class="booking-modal">
        <div class="booking-container">
          <button class="close-btn">&times;</button>
          <h2>Book Your Appointment</h2>
          
          <div class="form-group">
            <label for="booking-name">Full Name</label>
            <input type="text" id="booking-name" required>
          </div>
          
          <div class="form-group">
            <label for="booking-email">Email</label>
            <input type="email" id="booking-email" required>
          </div>
          
          <div class="form-group">
            <label for="booking-phone">Phone Number</label>
            <input type="tel" id="booking-phone" required>
          </div>
          
          <div class="form-group">
            <label for="booking-service">Service</label>
            <select id="booking-service">
              <option value="basic">Basic Refresh (499 SEK)</option>
              <option value="premium">Premium Deep Clean (999 SEK)</option>
              <option value="executive">Executive Detail (1499 SEK)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Choose Date</label>
            <div class="calendar">
              <input type="date" id="booking-date" required>
            </div>
          </div>
          
          <div class="form-group">
            <label>Available Time Slots</label>
            <div class="time-slots">
              <button class="time-slot">08:00 - 09:00</button>
              <button class="time-slot">09:00 - 10:00</button>
              <button class="time-slot">10:00 - 11:00</button>
              <button class="time-slot">11:00 - 12:00</button>
              <button class="time-slot">12:00 - 13:00</button>
              <button class="time-slot">13:00 - 14:00</button>
              <button class="time-slot">14:00 - 15:00</button>
              <button class="time-slot">15:00 - 16:00</button>
              <button class="time-slot">16:00 - 17:00</button>
            </div>
          </div>
          
          <div class="form-group">
            <label for="booking-notes">Special Instructions</label>
            <textarea id="booking-notes" rows="3"></textarea>
          </div>
          
          <button class="submit-btn">Confirm Booking</button>
        </div>
      </div>
    `;

    const modal = this.shadowRoot.querySelector('.booking-modal');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const timeSlots = this.shadowRoot.querySelectorAll('.time-slot');
    const submitBtn = this.shadowRoot.querySelector('.submit-btn');

    // Toggle modal
    this.openModal = () => modal.classList.add('active');
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    // Time slot selection
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
      });
    });

    // Form submission
    submitBtn.addEventListener('click', () => {
      const selectedTime = this.shadowRoot.querySelector('.time-slot.selected');
      if (!selectedTime) {
        alert('Please select a time slot');
        return;
      }
      
      // In a real app, you would send this data to your backend
      const bookingData = {
        name: this.shadowRoot.getElementById('booking-name').value,
        email: this.shadowRoot.getElementById('booking-email').value,
        phone: this.shadowRoot.getElementById('booking-phone').value,
        service: this.shadowRoot.getElementById('booking-service').value,
        date: this.shadowRoot.getElementById('booking-date').value,
        time: selectedTime.textContent,
        notes: this.shadowRoot.getElementById('booking-notes').value
      };
      
      console.log('Booking submitted:', bookingData);
      alert('Thank you for your booking! We will contact you shortly to confirm.');
      modal.classList.remove('active');
    });
  }
}

customElements.define('booking-calendar', BookingCalendar);