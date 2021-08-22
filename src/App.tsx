import React, { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import { MapContainer } from "react-leaflet";
import FormComponent from "./components/FormComponent/FormComponent";
import { Bound } from "./model/bound";

function App() {
  const [bound, setBound] = useState<Bound>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  return (
    <div className="App">
      <div className="form-container">
        <FormComponent bound={bound} />
      </div>
      <div className="map-container">
        <MapContainer
          center={[52.533247, 13.425464]}
          zoom={13}
          className="full-size">
          <MapComponent setBound={setBound} />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
