import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let userDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) { 
    userDates = selectedDates[0];
    if (userDates.getTime() < options.defaultDate.getTime()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        // alert('Please choose a date in the future');
        btnStart.disabled = true;
        return;
      }
      btnStart.disabled = false;
   
  },
};
flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onStartTimer);


function onStartTimer() {

  const intervalId = setInterval(() => {
    const startTime = userDates.getTime();
      // console.log(startTime);
    const deltaTime = startTime - Date.now();
    const timeComponents = convertMs(deltaTime);
    const { days, hours, minutes, seconds } = timeComponents;
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor(
    (((ms % day) % hour) % minute) / second
  ));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

