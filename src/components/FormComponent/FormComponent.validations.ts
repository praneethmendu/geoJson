import * as yup from "yup";

const latitude = yup
  .number()
  .min(-90, "provide a value between -90 and +90")
  .max(90, "provide a value between -90 and +90")
  .required("this cannot be empty");
const longitude = yup
  .number()
  .min(-180, "provide a value between -180 and +180")
  .max(180, "provide a value between -180 and +180")
  .required();

const validations = {
  left: longitude,
  right: longitude,
  top: latitude,
  bottom: latitude,
};
export default validations;
