import React, { Component } from "react";
import TeamA from "../components/TeamA";
import TeamB from "../components/TeamB";
import TeamC from "../components/TeamC";
import TeamD from "../components/TeamD";

export default class Division extends Component {
  render() {
    return (
      <div>
        <h1>Division </h1>
        <TeamA />
        <TeamB />
        <TeamC />
        <TeamD />
      </div>
    );
  }
}
