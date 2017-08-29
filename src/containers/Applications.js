import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FileSaver from "file-saver";
import { connect } from "react-redux";

import * as actions from "../actions";
import Applications from "../components/Applications";

class Container extends Component {
  state = {
    apps: []
  };

  async componentWillMount() {
    // this.props.setApplications([{ app: 1 }, { prop: 2 }]);
    // const resp = await axios.get("/api/applications");
    // const apps = resp.data
    // const apps = this.props.apps;
    // this.setState({
    //   apps: apps.map(m => ({
    //     ...m,
    //     versions: m.versions.map(v => ({ number: v, checked: false }))
    //   }))
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      apps: nextProps.apps.map(m => ({
        ...m,
        versions: m.versions.map(v => ({ number: v, checked: false }))
      }))
    });
  }

  handlerOnDownload = async () => {
    const apps = this.state.apps.reduce((acc, cur) => {
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

  handlerOnSelection = (name, version) => {
    this.props.selectVersion(name, version);

    // this.setState(prevState => {
    //   const index = prevState.apps.findIndex(f => f.name === name);

    //   const app = prevState.apps[index];
    //   const versionIndex = app.versions.findIndex(f => f.number === version);

    //   prevState.apps = [
    //     ...prevState.apps.slice(0, index),
    //     {
    //       ...app,
    //       versions: [
    //         ...app.versions
    //           .slice(0, versionIndex)
    //           .map(m => ({ ...m, checked: false })),
    //         {
    //           ...app.versions[versionIndex],
    //           checked: !app.versions[versionIndex].checked
    //         },
    //         ...app.versions
    //           .slice(versionIndex + 1)
    //           .map(m => ({ ...m, checked: false }))
    //       ]
    //     },
    //     ...prevState.apps.slice(index + 1)
    //   ];

    //   // console.log(prevState.apps);
    // });
  };

  render() {
    return (
      <div>
        <h1>Applications Versions</h1>

        <br />
        <button onClick={this.handlerOnDownload}>Download</button>
        <br />

        {/* apps={this.state.apps} */}
        <Applications
          apps={this.props.versionSelections}
          onSelection={this.handlerOnSelection}
        />
      </div>
    );
  }
}

Container.propTypes = {};

function mapStateToProps(state) {
  const { applications, versionSelections } = state;
  return {
    apps: applications,
    versionSelections: versionSelections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setApplications: apps => {
      dispatch(actions.setApplications(apps));
    },
    selectVersion: (name, version) => {
      dispatch(actions.selectVersion(name, version));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
