export default (state = {}, action) => {
  let selectValueForMaterial = null;
  switch (action.type) {
    case 'SELECT_MATERIAL_ACTION':
      selectValueForMaterial = action.payload;
      return selectValueForMaterial;
    default:
      return state;
  }
};
