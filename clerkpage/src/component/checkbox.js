import React, { Component } from "react";

export default class Checkbox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: true,
      };
    }
    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }
    render() {
      return (
        <label>
          <input type="checkbox"
            //defaultChecked={this.state.isChecked}
            onChange={this.toggleChange}
          />
        </label>
      );
    }
  }