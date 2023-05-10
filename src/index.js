import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  searchInput: document.querySelector('#search-box'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(searchHandler, DEBOUNCE_DELAY)
);

function searchHandler(ev) {
  if (ev.target.value !== '') {
    fetchCountries(ev.target.value.trim()).then(value => {
      if (value.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (value.length >= 2 && value.length <= 10) {
        outputCountryList(value);
      } else if (value.length === 1) {
        outputCountryCard(value);
      } else if (value.status === 404) {
        cleaning();
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
    });
    cleaning();
  }
}

function outputCountryCard(value) {
  cleaning();
  const markUp = value
    .map(
      el =>
        `<li>
   <img src = "${el.flags.svg}" width ="40"  height = "40">
   <p>${el.name.common}</p></li>
<p><span class="title">Capital: </span>${el.capital}</p>
<p><span class="title">Population: </span>${el.population}</p>
<p><span class="title">Languages: </span>${Object.values(el.languages)}</p>`
    )
    .join('');
  refs.countryInfo.innerHTML = markUp;
}

function outputCountryList(value) {
  cleaning();
  const item = value
    .map(
      el =>
        `<li>
 <img src = "${el.flags.svg}" width ="30" height = "30">
 <p>${el.name.common}</p></li>`
    )
    .join('');
  refs.countryList.innerHTML = item;
}

function cleaning() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
