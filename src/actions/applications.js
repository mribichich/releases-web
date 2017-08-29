import * as actionTypes from "../constants/actionTypes";

export function setApplications(applications) {
  return {
    type: actionTypes.APPLICATIONS_SET,
    payload: {
      applications
    }
  };
}
