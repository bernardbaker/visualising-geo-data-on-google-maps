export default (state = {}, action) => {
  let showingDetails = null;
  switch (action.type) {
    case 'SHOWING_DETAILS_ACTION':
      showingDetails = action.payload;
      return showingDetails;
    default:
      return state;
  }
};
