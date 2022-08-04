function getCountry(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,population,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

export { getCountry };
