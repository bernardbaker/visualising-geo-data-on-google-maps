export default (state = {}, action) => {
  let features = null;
  switch (action.type) {
    case 'FEATURES_ACTION':
      features = action.payload;
      return features;
    default:
      return state;
  }
};
