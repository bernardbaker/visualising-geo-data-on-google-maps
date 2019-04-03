export const selectMaterialAction = material => dispatch => {
  dispatch({
    type: 'SELECT_MATERIAL_ACTION',
    payload: material
  });
};
