import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  // console.log(event);
  event.preventDefault();
  let delay = Number(event.target[0].value);
  const step = Number(event.target[1].value);
  const amount = Number(event.target[2].value);
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    // console.log(i);
  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }); 
    delay += step;
  }
}


function createPromise(position, delay) {
  // console.log(position);
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
 if (shouldResolve) {
   resolve({ position, delay });
 } else {
   reject({ position, delay });
 }
    }, delay)
})
 }






