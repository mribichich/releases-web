import * as actionTypes from "../constants/actionTypes";
import reducer from "./applications";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual([]);
});

it("should handle APPLICATIONS_SET", () => {
  const newState = reducer([], {
    type: actionTypes.APPLICATIONS_SET,
    payload: { applications: [{}] }
  });

  expect(newState).toEqual([{}]);
});
