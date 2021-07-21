import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import { Card } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
     fetch("https://disease.sh./v3/covid-19/all")
       .then((response) => response.json())
       .then((data) => {
         setCountryInfo(data);
       });
  }, [])
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

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <section className="app__left">
        <div className="app__header">
          <p>Covid-19 TRACKER </p>
          <FormControl className="app__dropdown">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="corona cases"
            total={countryInfo.todayCases}
            cases={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.todayRecovered}
            cases={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            total={countryInfo.todayDeaths}
            cases={countryInfo.deaths}
          />
        </div>
        <div className="map">
          <Map />
        </div>
      </section>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <h3>Worldwide cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
