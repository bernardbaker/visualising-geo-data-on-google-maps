export default (state = {}, action) => {
  let materialList = null;
  switch (action.type) {
    case 'MATERIAL_LIST_ACTION':
      materialList = action.payload;
      return materialList;
    default:
      return state;
  }
};
