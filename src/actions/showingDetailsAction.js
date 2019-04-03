export const showingDetailsAction = showing => dispatch => {
  dispatch({
    type: 'SHOWING_DETAILS_ACTION',
    payload: showing
  });
};
