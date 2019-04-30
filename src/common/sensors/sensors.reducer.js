const initialState = {
  sensors: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, sensors: action.payload };

    default:
      return state;
  }
};

export default dataReducer;
