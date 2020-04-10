import {createHtmlString} from './astConverter';



const input = document.querySelector('.form__textarea');
const result = document.querySelector('.result'); 



document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
  
    return result.innerHTML = createHtmlString(input.value);
  })