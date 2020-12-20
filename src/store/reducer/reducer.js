
const initialState = {
    data: [],
    pageNumber: 1,
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
    case "SET_PAGE_NUMBER":
      return {
        ...state,
        pageNumber: action.payload
      };
    default:
      return state;
  }
};

export default data;