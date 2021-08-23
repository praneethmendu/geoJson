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
    52.531, 13.441,
  ]);
  const [secondVertex, setSecondVertex] = useState<LatLngTuple | null>([
    52.53, 13.44,
  ]);
  const [instructions, setInstructions] = useState<string>(
    "click anywhere to start over"
  );

  // initialValues
  useEffect(
    () =>
      setBound({
        left: 13.44,
        right: 13.441,
        bottom: 52.53,
        top: 52.531,
      }),
    [setBound]
  );

  useMapEvents({
    click(clickEvent: LeafletMouseEvent) {
      let latLng: LatLngTuple = [clickEvent.latlng.lat, clickEvent.latlng.lng];
      if (!firstVertex) {
        setFirstVertex(latLng);
        setInstructions("now pick the opposite vertex");
      } else if (!secondVertex) {
        setSecondVertex(latLng);
        setInstructions("click anywhere to start over");
        const tempLng = [firstVertex[1], clickEvent.latlng.lng].sort(
          (a, b) => a - b
        );
        const templat = [firstVertex[0], clickEvent.latlng.lat].sort(
          (a, b) => a - b
        );
        setBound({
          left: tempLng[0],
          right: tempLng[1],
          bottom: templat[0],
          top: templat[1],
        });
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
