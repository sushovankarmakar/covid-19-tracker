import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#CC1034", // represents hexa-demical color
    multiplier: 800, // represents size of the circle
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => b.cases - a.cases);
};

// Draw circles on the map with interactive tooltip.
export const showDataOnMap = (data, casesType = "cases") => {
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <h1>I am Popup</h1>
      </Popup>
    </Circle>
  ));
};
