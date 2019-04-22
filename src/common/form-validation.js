import RenderInput from "./form-fields/input.component";
import RenderRange from "./form-fields/range.component";
import RenderSelect from "./form-fields/select.component";

export const required = value =>
  value || typeof value === "number" ? undefined : "Required";

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const validate = field => {
  const errors = {};
  if (!field.name) {
    errors.name = "Please, give your plant a nickname";
  }
  if (!field.type) {
    errors.type = "Please, select type of your flower";
  }
  if (!field.airHumidity) {
    errors.airHumidity = "Please, specify humidity of the air";
  }
  if (!field.soilHumidity) {
    errors.soilHumidity = "Please, specify humidity of the soil";
  }
  if (!field.airTemperature) {
    errors.airTemperature = "Please, specify temperature of the air";
  }
  if (!field.light) {
    errors.light = "Please, specify light value";
  }

  return errors;
};

export default {
  validate,
  RenderInput,
  RenderRange,
  RenderSelect
};
