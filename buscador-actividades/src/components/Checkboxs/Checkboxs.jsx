import React, { Component } from "react";
import "./Checkbox.css";

import { Label, Input } from "reactstrap";

import { connect } from "react-redux";

class Checkboxs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
    this.test = this.test.bind(this);
  }

  test() {
    if (!this.state.isChecked) {
      this.setState({ isChecked: true });

      this.props.dispatch({
        type: "CHECKED_EVENTS",
        item: this.props.value
      });

      this.props.dispatch({
        type: "IS_CLICKED"
      });
    } else {
      this.setState({ isChecked: false });
      this.props.dispatch({
        type: "UNCHECKED_EVENTS"
      });
      this.props.dispatch({
        type: "IS_UNCLICKED"
      });
    }
  }

  render() {
    return (
      <div>
        <Input
          type="checkbox"
          id={this.props.id}
          value={this.props.value}
          onClick={this.test}
        />
        <Label for={this.props.id} className="font">
          {this.props.text}
        </Label>
      </div>
    );
  }
}

export default connect()(Checkboxs);
