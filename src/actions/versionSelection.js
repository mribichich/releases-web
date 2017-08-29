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
