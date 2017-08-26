import React from "react";
import PropTypes from "prop-types";

import Versions from "./Versions";

const Applications = ({ apps, onDownload, onSelection }) => {
  const handleOnSelection = (name, version) => {
    onSelection({ name, version });
  };

  return (
    <div>
      <h1>Applications Versions</h1>

      <br />
      <button onClick={onDownload}>Download</button>
      <br />

      <ul>
        {apps.map(m =>
          <li key={m.name}>
            {m.name}

            <Versions
              versions={m.versions}
              onSelection={version => handleOnSelection(m.name, version)}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

Applications.propTypes = {
  apps: PropTypes.array.isRequired,
  onDownload: PropTypes.func.isRequired
};

export default Applications;
