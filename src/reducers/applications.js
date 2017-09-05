import * as actionTypes from "../constants/actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APPLICATIONS_SET:
      return setApplications(state, action.payload);

    default:
      return state;
  }
}

function setApplications(state, payload) {
  const { applications } = payload;

  return [...applications];
}
