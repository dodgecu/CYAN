const initialState = {
  type: { airTemperature: 0, airHumidity: 0, light: 0, soilHumidity: 0 }
};

const setType = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload };

    default:
      return state;
  }
};

export default setType;
