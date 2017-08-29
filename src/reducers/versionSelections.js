import * as actionTypes from "../constants/actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APPLICATIONS_SET:
      return setVersionSelections(state, action);
    case actionTypes.SELECT_VERSION:
      return selectVersion(state, action.payload);
  }
  return state;
}

function setVersionSelections(state, action) {
  const { applications } = action;
  return applications.map(m => ({
    ...m,
    versions: m.versions.map(v => ({ number: v, checked: false }))
  }));
}

function selectVersion(state, payload) {
  const { name, version } = payload;

  const index = state.findIndex(f => f.name === name);

  const app = state[index];
  const versionIndex = app.versions.findIndex(f => f.number === version);

  return [
    ...state.slice(0, index),
    {
      ...app,
      versions: [
        ...app.versions
          .slice(0, versionIndex)
          .map(m => ({ ...m, checked: false })),
        {
          ...app.versions[versionIndex],
          checked: !app.versions[versionIndex].checked
        },
        ...app.versions
          .slice(versionIndex + 1)
          .map(m => ({ ...m, checked: false }))
      ]
    },
    ...state.slice(index + 1)
  ];
}
