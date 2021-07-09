import { useState, useRef, useEffect } from "react";
import { Circle, Popup } from "react-leaflet";

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
          <h1>I am Popup</h1>
        </Popup>
      </Circle>
    </>
  );
}
