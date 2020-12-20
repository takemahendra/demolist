
const initialState = {
    data: [],
    selectedItem: null
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload
      };
    case "SET_INDEX":
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
};

export default data;