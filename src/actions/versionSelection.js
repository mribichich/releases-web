import * as actionTypes from "../constants/actionTypes";

export function selectVersion(name, version) {
  return {
    type: actionTypes.SELECT_VERSION,
    payload: {
      name,
      version
    }
  };
}

export function toggleApplicationExpanded(name) {
  return {
    type: actionTypes.TOGGLE_APPLICATION_EXPANDED,
    payload: {
      name
    }
  };
}
