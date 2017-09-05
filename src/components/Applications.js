import React from "react";
import PropTypes from "prop-types";
import R from "ramda";

import Versions from "./Versions";

var versionSort = R.sortWith([R.descend(R.prop("number"))]);

const Applications = ({ apps, onSelection, onToggleExpanded }) => {
  return (
    <ul>
      {apps.map(m =>
        <li key={m.name}>
          {m.expanded
            ? <button onClick={() => onToggleExpanded(m.name)}>-</button>
            : <button onClick={() => onToggleExpanded(m.name)}>+</button>}{" "}
          {m.versions.some(s => s.checked)
            ? <strong>
                {m.name}
              </strong>
            : m.name}
          {m.expanded
            ? <Versions
                versions={versionSort(m.versions)}
                onSelection={version => onSelection(m.name, version)}
              />
            : null}
        </li>
      )}
    </ul>
  );
};

Applications.propTypes = {
  apps: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired,
  onToggleExpanded: PropTypes.func.isRequired
};

export default Applications;
