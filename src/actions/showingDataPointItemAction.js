export const showingDataPointItemAction = item => dispatch => {
  dispatch({
    type: 'SHOWING_DATA_POINT_ITEM_ACTION',
    payload: item
  });
};
