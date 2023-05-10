const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filterOutput = `?fields=name,capital,population,flags,languages`;

export function fetchCountries(nameInput) {
  return fetch(`${BASE_URL}${nameInput}${filterOutput}`).then(response => {
    return response.json();
  });
}
