import './css/styles.css';
// import './js/fetchCountries.js';
import { getCountry } from './js/fetchCountries.js';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  contryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  countrySearch: document.getElementById('search-box'),
};

refs.countrySearch.addEventListener(
  'input',
  debounce(inputCountry, DEBOUNCE_DELAY)
);

function inputCountry() {
  let inner = ``;
  getCountry(this.value.trim())
    .then(pushCountry => {
      refs.contryList.innerHTML = inner;
      if (pushCountry.length >= 2 && pushCountry.length <= 10) {
        let listOfCountry = pushCountry
          .map(element => {
            inner = `
            <li>
            <img src="${element.flags.svg}" alt="">
            <p>${element.name.official}</p>
            </li>`;
            return inner;
          })
          .join('');
        refs.contryList.innerHTML = listOfCountry;
        refs.countryInfo.innerHTML = '';
      }
      else if (pushCountry.length === 1) {
        const count = pushCountry.map(element => {
          const lang = Object.values(element.languages);
          inner = `
          <div class="country-info__entity">
          <img src="${element.flags.svg}" alt="">
          <p>${element.name.official}</p>
          </div>
          <ul class="country-info__list">
          <li><p class="country-info__descrip">Capital: <span>${element.capital}</span></p></li>
          <li><p class="country-info__descrip">Population: <span>${element.population}</span></p></li>
          <li><p class="country-info__descrip">Languages: <span>${lang}</span></p></li>
          </ul>
          `;
          return inner;
        });
        refs.countryInfo.innerHTML = count;
        refs.contryList.innerHTML = '';
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
