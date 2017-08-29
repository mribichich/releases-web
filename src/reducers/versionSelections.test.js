import * as actionTypes from "../constants/actionTypes";
import reducer from "./versionSelections";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual([]);
});

it("should handle APPLICATIONS_SET", () => {
  const newState = reducer([], {
    type: actionTypes.APPLICATIONS_SET,
    payload: {
      applications: [{ name: "some name", versions: ["1.0.0", "1.0.1"] }]
    }
  });

  expect(newState).toEqual([
    {
      name: "some name",
      versions: [
        {
          number: "1.0.0",
          checked: false
        },
        {
          number: "1.0.1",
          checked: false
        }
      ],
      expanded: false
    }
  ]);
});

it("should handle SELECT_VERSION", () => {
  const initialState = [
    {
      name: "some name",
      versions: [
        {
          number: "1.0.0",
          checked: false
        },
        {
          number: "1.0.1",
          checked: false
        }
      ],
      expanded: false
    }
  ];

  const newState = reducer(initialState, {
    type: actionTypes.SELECT_VERSION,
    payload: {
      name: "some name",
      version: "1.0.1"
    }
  });

  expect(newState).toEqual([
    {
      name: "some name",
      versions: [
        {
          number: "1.0.0",
          checked: false
        },
        {
          number: "1.0.1",
          checked: true
        }
      ],
      expanded: false
    }
  ]);
});

it("should handle TOGGLE_APPLICATION_EXPANDED", () => {
  const initialState = [
    {
      name: "some name",
      versions: [
        {
          number: "1.0.0",
          checked: false
        },
        {
          number: "1.0.1",
          checked: false
        }
      ],
      expanded: false
    }
  ];

  const newState = reducer(initialState, {
    type: actionTypes.TOGGLE_APPLICATION_EXPANDED,
    payload: {
      name: "some name"
    }
  });

  expect(newState).toEqual([
    {
      name: "some name",
      versions: [
        {
          number: "1.0.0",
          checked: false
        },
        {
          number: "1.0.1",
          checked: false
        }
      ],
      expanded: true
    }
  ]);
});
