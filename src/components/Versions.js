import React from "react";
import PropTypes from "prop-types";

const Versions = ({ versions, onSelection }) => {
  const ran = Math.random();

  // const handleOnSelection = (e, version)=>{
  //   onSelection(version)
  // }

  return (
    <ul>
      {versions.map(m =>
        <li key={m.number}>
          <label>
            <input
              type="radio"
              name={ran}
              value={m.number}
              checked={m.checked}
              onClick={e => onSelection(m.number)}
            />{" "}
            {m.checked
              ? <strong>
                  {m.number}
                </strong>
              : m.number}
          </label>
        </li>
      )}
    </ul>
  );
};

Versions.propTypes = {
  versions: PropTypes.array.isRequired,
  onSelection: PropTypes.func.isRequired
};

export default Versions;
