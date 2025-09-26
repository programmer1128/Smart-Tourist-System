// src/App.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const locations = [
  { name: "Behala", lat: 22.4829, lng: 88.2933 },
  { name: "Howrah", lat: 22.5958, lng: 88.2636 },
  { name: "Shalkia", lat: 22.6774, lng: 88.3668 },
  { name: "Rashbehari", lat: 22.5205, lng: 88.3628 },
];

function App() {
  const appStyles = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  };

  const mapStyles = {
    height: "500px",
    width: "100%",
  };

  const headingStyles = {
    marginBottom: "20px",
  };

  return (
    <div style={appStyles}>
      <h1 style={headingStyles}>Map of Locations</h1>
      <MapContainer
        center={[22.5726, 88.3639]} // Center of Kolkata
        zoom={11}
        scrollWheelZoom={true}
        style={mapStyles}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
