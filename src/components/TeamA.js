import React, { Component } from "react";
import "./TeamA.css";

import Top from "../Top.png";
import Mid from "../Mid.png";
import JG from "../JG.png";
import Bot from "../Bot.png";
import Supp from "../Supp.png";

export default class TeamA extends Component {
  teamGroups = [];

  createTeamBox() {
    let positionCount = 0;

    if (this.props.team) {
      this.teamGroups = this.props.team.groups.map((group) => {
        let groupDiv = group.players.map((player) => {
          // Give icons to proper positions
          let icon;

          if (positionCount === 0) icon = Top;
          else if (positionCount === 1) icon = JG;
          else if (positionCount === 2) icon = Mid;
          else if (positionCount === 3) icon = Bot;
          else if (positionCount === 4) icon = Supp;

          positionCount++;

          // Check for multiple primary/secondary positions
          // if so, build a string of the multiple positions for use in <span> tag
          let primaryPositions = "";
          let secondaryPositions = "";

          if (player.primary_positions.length > 1) {
            player.primary_positions.forEach((position) => {
              if (primaryPositions === "") primaryPositions = position;
              else primaryPositions = primaryPositions + `, ${position}`;
            });
          } else primaryPositions = player.primary_positions;

          if (player.secondary_positions.length > 1) {
            player.secondary_positions.forEach((position) => {
              if (secondaryPositions === "") secondaryPositions = position;
              else secondaryPositions = secondaryPositions + `, ${position}`;
            });
          } else secondaryPositions = player.secondary_positions;

          // Return a <span> tag with player information
          return (
            <div className="player">
              <img src={icon} alt="icon" className="player-icon" />
              <span>
                {player.in_game_name} / {player.discord_name} @{" "}
                {player.rank_level} {"{"}
                {primaryPositions}
                {"}"} and {"{"}
                {secondaryPositions}
                {"}"}
              </span>
            </div>
          );
        });
        return <div className="groupDiv"> {groupDiv} </div>;
      });
    }
    return this.teamGroups;
  }

  render() {
    this.createTeamBox();
    return (
      <div className="TeamA-container">
        {this.teamGroups.length > 0 ? (
          this.createTeamBox()
        ) : (
          <div> No team added</div>
        )}
      </div>
    );
  }
}
