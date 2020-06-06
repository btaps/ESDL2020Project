import React, { Component } from "react";
import "./Division.css";

import TeamA from "../components/TeamA";
import TeamB from "../components/TeamB";
import TeamC from "../components/TeamC";
import TeamD from "../components/TeamD";
import Unplaced from "../components/Unplaced";

export default class Division extends Component {
  state = {
    teamA: null,
    teamB: null,
    teamC: null,
    teamD: null,
  };

  // Update state teams when new division is chosen
  updateTeams(division) {
    if (division.length !== 0 && this.state.teamA !== division[0].teams[0]) {
      this.setState({
        teamA: division[0].teams[0],
        teamB: division[0].teams[1],
        teamC: division[0].teams[2],
        teamD: division[0].teams[3],
      });
    }
  }

  componentDidUpdate() {
    this.selectedDivision =
      this.props.division !== null
        ? this.props.listOfDivisions.filter(
            (division) => this.props.division === division.division
          )
        : [];
    this.updateTeams(this.selectedDivision);
  }
  render() {
    return (
      <div className="Division-container">
        <TeamA team={this.state.teamA} />
        <TeamB team={this.state.teamB} />
        <TeamC team={this.state.teamC} />
        <TeamD team={this.state.teamD} />
        <Unplaced />
      </div>
    );
  }
}
