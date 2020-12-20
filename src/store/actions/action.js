export const setData = data => {
  return {
    type: "SET_DATA",
    payload: data
  };
};

export const setSelectedIndex = data => {
  return {
    type: "SET_INDEX",
    payload: data
  };
};

export const setPageNumber = data => {
  return {
    type: "SET_PAGE_NUMBER",
    payload: data
  };
};

