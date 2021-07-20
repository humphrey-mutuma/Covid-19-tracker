import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //kenya, United Kingdom
            value: country.countryInfo.iso2, // ke, UK
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <p>Covid-19 TRACKER </p>
        <FormControl className="app__dropdown">
          <Select onChange={onCountryChange} variant="outlined" value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="corona cases" total={200} cases={123}/>
        <InfoBox title="Recovered" total={85} cases={845 } />
        <InfoBox title="Deaths" total={200} cases={123}/>
      </div>
    </div>
  );
}

export default App;
