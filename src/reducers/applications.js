import * as actionTypes from "../constants/actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APPLICATIONS_SET:
      return setApplications(state, action);
  }
  return state;
}

function setApplications(state, action) {
  const { applications } = action;
  return [ ...applications];
}
