const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let intervalId;

btnStart.addEventListener('click', onStartChangeColor);
btnStop.addEventListener('click', onStopCangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartChangeColor() {
  intervalId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
}

function onStopCangeColor() {
  clearInterval(intervalId);
  btnStart.disabled = false;
}
