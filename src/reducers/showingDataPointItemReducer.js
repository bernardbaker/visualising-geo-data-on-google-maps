export default (state = {}, action) => {
  let selectedDataPointItem = null;
  switch (action.type) {
    case 'SHOWING_DATA_POINT_ITEM_ACTION':
      selectedDataPointItem = action.payload;
      return selectedDataPointItem;
    default:
      return state;
  }
};
