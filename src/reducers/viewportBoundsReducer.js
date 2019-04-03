export default (state = {}, action) => {
  let geo = null;
  switch (action.type) {
    case 'VIEWPORT_BOUNDS_ACTION':
      geo = action.payload;
      return geo;
    default:
      return state;
  }
};
