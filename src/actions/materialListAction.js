export const materialListAction = list => dispatch => {
  dispatch({
    type: 'MATERIAL_LIST_ACTION',
    payload: list
  });
};
