export const selectSizeForCategoryAction = selection => dispatch => {
  dispatch({
    type: 'SELECT_SIZE_FOR_CATEGORY_ACTION',
    payload: selection
  });
};
