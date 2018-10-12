export const REQUEST_AREA = "REQUEST_AREA";
export const RECEIVE_AREA = "RECEIVE_AREA";
export const INVALIDATE_AREA = "INVALIDATE_AREA";

export const invalidateArea = params => ({
  type: INVALIDATE_AREA,
  params
});

export const requestArea = params => ({
  type: REQUEST_AREA,
  params
});

export const receiveArea = (params, json) => ({
  type: RECEIVE_AREA,
  params,
  areas: json.areas,
  receivedAt: Date.now()
});

const fetchApiArea = params => async dispatch => {

  const response = await fetch(`http://167.99.79.65:3000/api/areas`);
  const json = await response.json();
  console.log(json);
  return dispatch(receiveArea(params, json));
};

const shouldFetch = (state, params) => {
  const item = state;
  if (!item) {
    return true;
  }
  if (item.isFetching) {
    return false;
  }
  return item.didInvalidate;
};

export const fetchArea = params => (dispatch, getState) => {
  if (shouldFetch(getState(), params)) {
    return dispatch(fetchApiArea(params));
  }
};
