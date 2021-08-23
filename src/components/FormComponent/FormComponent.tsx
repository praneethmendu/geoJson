import React, { useState } from "react";
import "./FormComponent.css";
import JsonDilogComponent from "../JsonDilogComponent/JsonDilogComponent";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { Bound } from "../../model/bound";
import geoBoxService from "../../services/geoBoxService";
import validations from "./FormComponent.validations";
import * as yup from "yup";
interface Props {
  bound: Bound;
}

function FormComponent(props: Props): JSX.Element {
  const { bound } = props;
  const [currentGeoJson, setCurrentGeoJson] = useState({});
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: bound,
    enableReinitialize: true,
    validationSchema: yup.object().shape(validations),
    onSubmit: (values) => {
      if ((values.top - values.bottom) * (values.right - values.left) > 0.25)
        alert(`the selection is too large:
      (top - bottom) x (right -left) should be lesser than 0.25
      `);
      else {
        setLoading(true);
        geoBoxService(values).subscribe((geoJson) => {
          setLoading(false);
          if ("error" in geoJson && geoJson.error) {
            alert(geoJson.message);
          } else {
            setCurrentGeoJson(geoJson);
          }
        });
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="left"
          name="left"
          label="left ( longitude )"
          value={formik.values.left}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.left)}
          helperText={formik.errors.left}
          variant="filled"
          type="number"
        />
        <TextField
          fullWidth
          id="right"
          name="right"
          label="right ( longitude )"
          value={formik.values.right}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.right)}
          helperText={formik.errors.right}
          variant="filled"
          type="number"
        />
        <TextField
          fullWidth
          id="top"
          name="top"
          label="top ( latitude )"
          value={formik.values.top}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.top)}
          helperText={formik.errors.top}
          variant="filled"
          type="number"
        />
        <TextField
          fullWidth
          id="bottom"
          name="bottom"
          label="bottom ( latitude )"
          value={formik.values.bottom}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.bottom)}
          helperText={formik.errors.bottom}
          variant="filled"
          type="number"
        />
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth
          disabled={!formik.isValid || loading}
          type="submit">
          {loading ? "...loading" : "Submit"}
        </Button>
        <JsonDilogComponent
          geoJson={currentGeoJson}
          setGeoJson={setCurrentGeoJson}
        />
      </form>
    </div>
  );
}

export default FormComponent;
