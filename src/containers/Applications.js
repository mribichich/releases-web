import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FileSaver from "file-saver";
import { connect } from "react-redux";

import * as actions from "../actions";
import Applications from "../components/Applications";

export class ApplicationsContainer extends Component {
  handlerOnDownload = async () => {
    const apps = this.props.versionSelections.reduce((acc, cur) => {
      const versionChecked = cur.versions.find(f => f.checked);

      if (versionChecked) {
        acc = [...acc, { name: cur.name, version: versionChecked.number }];
      }

      return acc;
    }, []);

    const resp = await axios.post("/api/applications/download", apps, {
      responseType: "arraybuffer"
    });

    var blob = new File([resp.data], `releases_${new Date().toJSON()}.zip`, {
      type: "application/zip"
    });

    FileSaver.saveAs(blob);
  };

  render() {
    const { versionSelections, onSelectVersion, onToggleExpanded } = this.props;

    return (
      <div>
        <h1>Downloads Web</h1>

        <br />
        <button onClick={this.handlerOnDownload}>Download</button>
        <br />

        {this.renderSelectedVersions(versionSelections)}

        <button onClick={this.handlerOnDownload}>Download</button>
        <br />

        <Applications
          apps={versionSelections}
          onSelection={onSelectVersion}
          onToggleExpanded={onToggleExpanded}
        />
      </div>
    );
  }

  renderSelectedVersions(versionSelections) {
    const selected = versionSelections
      .map(m => ({ name: m.name, version: m.versions.find(f => f.checked) }))
      .filter(f => f.version);

    return selected.length > 0
      ? <ul>
          {selected.map(m =>
            <li key={m.name}>
              {m.name} {m.version.number}
            </li>
          )}
        </ul>
      : <div>
          <br />
          <span>No version selected</span>
          <br />
          <br />
        </div>;
  }
}

ApplicationsContainer.propTypes = {
  versionSelections: PropTypes.array.isRequired,
  onSelectVersion: PropTypes.func
};

function mapStateToProps(state) {
  const { versionSelections } = state;

  return {
    versionSelections: versionSelections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectVersion: (name, version) => {
      dispatch(actions.selectVersion(name, version));
    },
    onToggleExpanded: name => {
      dispatch(actions.toggleApplicationExpanded(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ApplicationsContainer
);
