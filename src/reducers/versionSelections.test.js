import * as actionTypes from '../constants/actionTypes';
import reducer, { versionToNumber } from './versionSelections';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual([]);
});

it('should handle APPLICATIONS_SET', () => {
  const newState = reducer([], {
    type: actionTypes.APPLICATIONS_SET,
    payload: {
      applications: [
        { name: 'some name', versions: ['1.0.0_setup', '1.0.1_setup'] }
      ]
    }
  });

  expect(newState).toEqual([
    {
      name: 'some name',
      versions: [
        {
          number: '1.0.0_setup',
          checked: false,
          byNumber: '00001.00000.00000_setup'
        },
        {
          number: '1.0.1_setup',
          checked: false,
          byNumber: '00001.00000.00001_setup'
        }
      ],
      expanded: false
    }
  ]);
});

it('should handle SELECT_VERSION', () => {
  const initialState = [
    {
      name: 'some name',
      versions: [
        {
          number: '1.0.0_setup',
          checked: false,
          byNumber: '00001.00000.00000_setup'
        },
        {
          number: '1.0.1_setup',
          checked: false,
          byNumber: '00001.00000.00001_setup'
        }
      ],
      expanded: false
    }
  ];

  const newState = reducer(initialState, {
    type: actionTypes.SELECT_VERSION,
    payload: {
      name: 'some name',
      version: '1.0.1_setup'
    }
  });

  expect(newState).toEqual([
    {
      name: 'some name',
      versions: [
        {
          number: '1.0.0_setup',
          checked: false,
          byNumber: '00001.00000.00000_setup'
        },
        {
          number: '1.0.1_setup',
          checked: true,
          byNumber: '00001.00000.00001_setup'
        }
      ],
      expanded: false
    }
  ]);
});

it('should handle TOGGLE_APPLICATION_EXPANDED', () => {
  const initialState = [
    {
      name: 'some name',
      versions: [
        {
          number: '1.0.0_setup',
          checked: false,
          byNumber: '00001.00000.00000_setup'
        },
        {
          number: '1.0.1_setup',
          checked: false,
          byNumber: '00001.00000.00001_setup'
        }
      ],
      expanded: false
    }
  ];

  const newState = reducer(initialState, {
    type: actionTypes.TOGGLE_APPLICATION_EXPANDED,
    payload: {
      name: 'some name'
    }
  });

  expect(newState).toEqual([
    {
      name: 'some name',
      versions: [
        {
          number: '1.0.0_setup',
          checked: false,
          byNumber: '00001.00000.00000_setup'
        },
        {
          number: '1.0.1_setup',
          checked: false,
          byNumber: '00001.00000.00001_setup'
        }
      ],
      expanded: true
    }
  ]);
});

it('should convert the version number to sortable number', () => {
  expect(versionToNumber('1.0.1_setup')).toBe('00001.00000.00001_setup');
});
