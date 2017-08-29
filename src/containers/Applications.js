import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FileSaver from "file-saver";
import { connect } from "react-redux";

import * as actions from "../actions";
import Applications from "../components/Applications";

class Container extends Component {
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
        <h1>Applications Versions</h1>

        <br />
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
}

Container.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Container);
