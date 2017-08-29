import * as actions from "./versionSelection";
import * as types from "../constants/actionTypes";

it("should create an action to select the version", () => {
  const name = "some name";
  const version = "1.2.3";
  const expectedAction = {
    type: types.SELECT_VERSION,
    payload: { name, version }
  };
  expect(actions.selectVersion(name, version)).toEqual(expectedAction);
});

it("should create an action to toggle the application expansion", () => {
  const name = "some name";
  const expectedAction = {
    type: types.TOGGLE_APPLICATION_EXPANDED,
    payload: { name }
  };
  expect(actions.toggleApplicationExpanded(name)).toEqual(expectedAction);
});
