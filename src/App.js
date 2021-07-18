import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(["Kenya", "UK", "Spain"]);

  // https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [countries]);
  
  return (
    <div className="app">
      <div className="app__header">
        <p>Covid-19 TRACKER </p>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
