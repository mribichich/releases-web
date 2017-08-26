import React, { Component } from "react";
import PropTypes from "prop-types";

import Applications from "../components/Applications";

class Container extends Component {
  state = {
    apps: []
  };

  componentWillMount() {
    const apps = [
      { name: "Sis.Access.Web", versions: ["1.0.2", "1.0.1", "1.0.0"] },
      { name: "Sis.ControlPanel.Web", versions: ["1.1.0", "1.0.1", "1.0.0"] },
      { name: "Sis.ControlPanel.Api", versions: ["1.2.0", "1.1.0", "1.0.0"] }
    ];

    this.setState({
      apps: apps.map(m => ({
        ...m,
        versions: m.versions.map(v => ({ number: v, checked: false }))
      }))
    });
  }

  handlerOnDownload = () => {
    const apps = this.state.apps.reduce((acc, cur) => {
      const versionChecked = cur.versions.find(f => f.checked);

      if (versionChecked) {
        acc = [...acc, { name: cur.name, version: versionChecked.number }];
      }

      return acc;
    }, []);

    // console.log(apps);
  };

  handlerOnSelection = selected => {
    // console.log(selected);

    this.setState(prevState => {
      const index = prevState.apps.findIndex(f => f.name === selected.name);

      const app = prevState.apps[index];
      const versionIndex = app.versions.findIndex(
        f => f.number === selected.version
      );

      prevState.apps = [
        ...prevState.apps.slice(0, index),
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
        ...prevState.apps.slice(index + 1)
      ];

      // console.log(prevState.apps);
    });
  };

  render() {
    return (
      <Applications
        apps={this.state.apps}
        onDownload={this.handlerOnDownload}
        onSelection={this.handlerOnSelection}
      />
    );
  }
}

Container.propTypes = {};

export default Container;
