import * as actions from "./applications";
import * as types from "../constants/actionTypes";

it("should create an action to set applications", () => {
  const applications = [{}, {}, {}];
  const expectedAction = {
    type: types.APPLICATIONS_SET,
    payload: { applications }
  };
  expect(actions.setApplications(applications)).toEqual(expectedAction);
});
