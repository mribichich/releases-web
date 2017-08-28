import React from "react";
import PropTypes from "prop-types";

import Versions from "./Versions";

const Applications = ({ apps, onSelection }) => {
  // const handleOnSelection = (name, version) => {
  //   onSelection({ name, version });
  // };

  return (
    <ul>
      {apps.map(m =>
        <li key={m.name}>
          {m.name}

          <Versions
            versions={m.versions}
            onSelection={version => onSelection(m.name, version)}
          />
        </li>
      )}
    </ul>
  );
};

Applications.propTypes = {
  apps: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired
};

export default Applications;
