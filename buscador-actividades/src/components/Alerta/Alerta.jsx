import React, { Component } from "react";
import { Alert } from "reactstrap";

import "./Alerta.css";

export default class Alerta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    if (this.state.visible) {
      setTimeout(() => {
        this.setState({
          visible: false
        });
      }, 2500);
    }
    return (
      <div className="alerta">
        <Alert
          color={this.props.alertColor}
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.props.alertMessage}
        </Alert>
      </div>
    );
  }
}
