import { Button, Dialog, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";

import React from "react";
import ReactJson from "react-json-view";
import "./JsonDilogComponent.css";

interface Props {
  geoJson: object;
  setGeoJson: React.Dispatch<React.SetStateAction<object>>;
}

function JsonDilogComponent(props: Props): JSX.Element {
  const { geoJson, setGeoJson } = props;

  const getHref = URL.createObjectURL(
    new Blob([JSON.stringify(geoJson)], { type: "application/json" })
  );

  return (
    <>
      <Dialog
        open={!!Object.keys(geoJson).length}
        onClose={() => setGeoJson({})}>
        <div className="json-dilog">
          <div className="top-panel">
            <Button href={getHref} download="geoJSON.json" variant="contained">
              <GetAppRoundedIcon />
              geoJSON
            </Button>
            <IconButton
              onClick={() => setGeoJson({})}
              color="primary"
              aria-label="close"
              component="span">
              <Close />
            </IconButton>
          </div>
          <br />
          <ReactJson src={geoJson} />
        </div>
      </Dialog>
    </>
  );
}

export default JsonDilogComponent;
