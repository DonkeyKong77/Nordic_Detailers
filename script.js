
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced booking calendar functionality
    const bookingDateInput = document.getElementById('booking-date');
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    bookingDateInput.min = minDate;
    
    // Generate available time slots (9am-5pm, hourly)
    const generateTimeSlots = (date) => {
        const slots = [];
        const day = new Date(date).getDay();
        const isWeekend = day === 0 || day === 6; // Sunday or Saturday
        
        // Weekday slots (more availability)
        if (!isWeekend) {
            for (let hour = 9; hour <= 17; hour++) {
                const startHour = hour.toString().padStart(2, '0');
                const endHour = (hour + 1).toString().padStart(2, '0');
                slots.push(`${startHour}:00 - ${endHour}:00`);
            }
        } else {
            // Weekend slots (reduced availability)
            for (let hour = 10; hour <= 15; hour += 2) {
                const startHour = hour.toString().padStart(2, '0');
                const endHour = (hour + 2).toString().padStart(2, '0');
                slots.push(`${startHour}:00 - ${endHour}:00`);
            }
        }
        return slots;
    };

    let selectedDate = null;
    let selectedTimeSlot = null;

    // Enhanced date picker with time slot management
    bookingDateInput.addEventListener('change', function() {
        selectedDate = this.value;
        selectedTimeSlot = null;
        
        const timeSlotsContainer = document.getElementById('time-slots-container');
        const timeSlotsEl = document.getElementById('time-slots');
        
        // Check if date is valid (not in past)
        const selectedDateObj = new Date(this.value);
        if (selectedDateObj < today.setHours(0,0,0,0)) {
            alert('Vänligen välj ett framtida datum.');
            this.value = '';
            timeSlotsContainer.classList.add('hidden');
            return;
        }

        // Generate appropriate time slots based on day
        const timeSlots = generateTimeSlots(this.value);
        
        timeSlotsContainer.classList.remove('hidden');
        timeSlotsEl.innerHTML = '';

        if (timeSlots.length === 0) {
            timeSlotsEl.innerHTML = '<p class="text-gray-600 py-4">Inga tillgängliga tider detta datum</p>';
            return;
        }

        // Generate time slot buttons with better UX
        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'time-slot-btn bg-gray-100 hover:bg-navy-blue hover:text-white text-gray-800 font-medium py-2 px-4 rounded transition duration-200';
            button.textContent = slot;
            
            button.addEventListener('click', function() {
                // Clear previous selection
                document.querySelectorAll('.time-slot-btn').forEach(btn => {
                    btn.classList.remove('bg-navy-blue', 'text-white', 'ring-2', 'ring-navy-blue');
                    btn.classList.add('bg-gray-100', 'text-gray-800');
                });
                
                // Set new selection
                this.classList.remove('bg-gray-100', 'text-gray-800');
                this.classList.add('bg-navy-blue', 'text-white', 'ring-2', 'ring-navy-blue');
                selectedTimeSlot = this.textContent;
            });
            
            timeSlotsEl.appendChild(button);
        });
    });

    // Enhanced form submission
// Handle form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedTimeSlot) {
                alert('Vänligen välj en tid');
                return;
            }

            const formData = {
                name: this.elements.name.value,
                email: this.elements.email.value,
                phone: this.elements.phone.value,
                service: this.elements.service.value,
                date: document.getElementById('datepicker').value,
                time: selectedTimeSlot
            };

            console.log('Booking submitted:', formData);
            alert('Tack för din bokning! Vi bekräftar via e-post snart.');
            this.reset();
            document.getElementById('time-slots-container').classList.add('hidden');
            selectedTimeSlot = null;
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
const elements = document.querySelectorAll('.animate-in');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Form submission with better UX
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader" class="animate-spin mr-2"></i> Processing...';
            feather.replace();
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successEl = document.createElement('div');
            successEl.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
            successEl.innerHTML = `
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline">We've received your booking request.</span>
            `;
            form.parentNode.insertBefore(successEl, form);
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        });
    }
// Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});