import RenderInput from "../../../common/form-fields/input.component";
import RenderRange from "../../../common/form-fields/range.component";
import RenderSelect from "../../../common/form-fields/select.component";

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
