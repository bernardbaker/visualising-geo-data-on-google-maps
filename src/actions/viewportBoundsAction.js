export const viewportBoundsAction = geo => dispatch => {
  dispatch({
    type: 'VIEWPORT_BOUNDS_ACTION',
    payload: geo
  });
};
