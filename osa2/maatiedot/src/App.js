import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  // use API key or environment variable
  useEffect(() => {
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=XXXXXXX&q=${
          country.capital
        }`
      )
      .then(response => {
        setWeatherData(response.data);
      });
  }, []);

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="" height="150px" />
      <h2>Weather in {country.capital}</h2>
      <div>
        <strong>temperature: </strong>{' '}
        {weatherData ? weatherData.current.temp_c : ''} Celsius
      </div>
      <div>
        <img
          src={weatherData ? weatherData.current.condition.icon : ''}
          alt=""
        />
      </div>
      <div>
        <strong>wind: </strong>
        {weatherData ? weatherData.current.wind_kph : ''} kph direction{' '}
        {weatherData ? weatherData.current.wind_dir : ''}
      </div>
    </div>
  );
};

const CountryListing = ({ country, handleClick }) => {
  return (
    <div>
      {country}
      <button onClick={handleClick}>show</button>
    </div>
  );
};

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountryData(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filterResults = countryData.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  let dataToShow;

  if (filterResults.length === 0) {
    dataToShow = <div>No matches found</div>;
  } else if (filterResults.length > 10) {
    dataToShow = <div>Too many matches, specify another filter</div>;
  } else if (filterResults.length > 1) {
    dataToShow = filterResults.map(country => {
      return (
        <CountryListing
          key={country.name}
          country={country.name}
          handleClick={() => setFilter(country.name)}
        />
      );
    });
  } else {
    dataToShow = <Country country={filterResults[0]} />;
  }

  return (
    <div>
      <form value={filter}>
        find countries: <input onChange={handleFilterChange} />
      </form>
      <div>{dataToShow}</div>
    </div>
  );
};

export default App;
