import React from "react";
import PropTypes from "prop-types";

import Versions from "./Versions";

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
                versions={m.versions}
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
