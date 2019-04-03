export default (state = {}, action) => {
  let selectValueForSizeCategory = null;
  switch (action.type) {
    case 'SELECT_SIZE_FOR_CATEGORY_ACTION':
      selectValueForSizeCategory = action.payload;
      return selectValueForSizeCategory;
    default:
      return state;
  }
};
