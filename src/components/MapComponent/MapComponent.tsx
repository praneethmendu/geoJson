import "./MapComponent.css";
import { useState, useEffect } from "react";
import { Marker, Rectangle, useMapEvents, TileLayer } from "react-leaflet";
import { Bound } from "../../model/bound";
import { LatLngTuple, LeafletMouseEvent } from "leaflet";
interface Props {
  setBound: (bound: Bound) => void;
}

const MapComponent = (props: Props) => {
  const { setBound } = props;
  const [firstVertex, setFirstVertex] = useState<LatLngTuple | null>([
    52.533, 13.425,
  ]);
  const [secondVertex, setSecondVertex] = useState<LatLngTuple | null>([
    52.534, 13.426,
  ]);
  const [instructions, setInstructions] = useState<string>(
    "click anywhere to start over"
  );

  // initialValues
  useEffect(() => {
    if (secondVertex && firstVertex) {
      const tempLng = [firstVertex[1], secondVertex[1]].sort((a, b) => a - b);
      const templat = [firstVertex[0], secondVertex[0]].sort((a, b) => a - b);
      setBound({
        left: tempLng[0],
        right: tempLng[1],
        bottom: templat[0],
        top: templat[1],
      });
    }
  }, [secondVertex, firstVertex, setBound]);

  useMapEvents({
    click(clickEvent: LeafletMouseEvent) {
      let latLng: LatLngTuple = [clickEvent.latlng.lat, clickEvent.latlng.lng];
      if (!firstVertex) {
        setFirstVertex(latLng);
        setInstructions("now pick the opposite vertex");
      } else if (!secondVertex) {
        setSecondVertex(latLng);
        setInstructions("click anywhere to start over");
      } else {
        setFirstVertex(null);
        setSecondVertex(null);
        setInstructions("pick first vertex to get started");
      }
    },
  });

  return (
    <>
      <p className="instructions">&nbsp; {instructions} &nbsp;</p>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {firstVertex ? (
        secondVertex ? (
          <Rectangle bounds={[firstVertex, secondVertex]}></Rectangle>
        ) : (
          <Marker position={firstVertex}></Marker>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default MapComponent;
