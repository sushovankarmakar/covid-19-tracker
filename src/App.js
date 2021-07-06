import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "../src/components/InfoBox";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select
            defaultValue=""
            variant="outlined"
            value={country}
            onChange={handleCountryChange}
          >
            <MenuItem key="worldwide" value="worldwide">
              Worldwide
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
        <InfoBox title="Recovered" cases={1234} total={20001} />
        <InfoBox title="Deaths" cases={12345} total={20002} />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
