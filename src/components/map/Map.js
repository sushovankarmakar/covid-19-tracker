import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import ChangeView from "./ChangeView";
import MapCircle from "./MapCircle";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />

        {countries?.length > 0 &&
          countries.map((country, index) => (
            <MapCircle key={index} country={country} casesType={casesType} />
          ))}

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
