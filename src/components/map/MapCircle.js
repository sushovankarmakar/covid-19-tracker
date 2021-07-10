import { useState, useRef, useEffect } from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

import "./MapCircle.css";

export default function MapCircle({ country, casesType = "cases" }) {
  const circleRef = useRef();

  const caseTypeColors = {
    cases: {
      hex: "#CC1034", // represents hexa-demical color
      multiplier: 200, // represents size of the circle
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 500,
    },
  };

  const [circleProperties, setCircleProperties] = useState({
    center: {
      lat: 50.5,
      lng: 30.5,
    },
    radius: 0,
    color: caseTypeColors[casesType].hex,
    fillColor: caseTypeColors[casesType].hex,
  });

  useEffect(() => {
    setCircleProperties({
      center: [country.countryInfo.lat, country?.countryInfo.long],
      radius:
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier,
      color: caseTypeColors[casesType].hex,
      fillColor: caseTypeColors[casesType].hex,
    });
  }, [country, casesType]);

  return (
    <>
      <Circle
        ref={circleRef}
        center={circleProperties.center}
        radius={circleProperties.radius}
        color={circleProperties.color}
        fillColor={circleProperties.fillColor}
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    </>
  );
}
