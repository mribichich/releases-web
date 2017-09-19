import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APPLICATIONS_SET:
      return setVersionSelections(state, action.payload);
    case actionTypes.SELECT_VERSION:
      return selectVersion(state, action.payload);
    case actionTypes.TOGGLE_APPLICATION_EXPANDED:
      return toggleApplicationExpanded(state, action.payload);

    default:
      return state;
  }
}

export const versionToNumber = version => {
  const parts = version.split('_');
  const v = parts[0].split('.').map(m => m.padStart(5, '0'));
  return [v.join('.'), parts[1]].join('_');
};

function setVersionSelections(state, payload) {
  const { applications } = payload;
  return applications.map(m => ({
    ...m,
    versions: m.versions.map(v => ({
      number: v,
      checked: false,
      byNumber: versionToNumber(v)
    })),
    expanded: false
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

function toggleApplicationExpanded(state, payload) {
  const { name } = payload;

  const index = state.findIndex(f => f.name === name);

  const app = state[index];

  return [
    ...state.slice(0, index),
    { ...app, expanded: !app.expanded },
    ...state.slice(index + 1)
  ];
}
