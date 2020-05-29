import React, { Component } from "react";
import Division from "./Division";
import Unplaced from "../components/Unplaced";
import ScratchPad from "../components/ScratchPad";
import JSON from "../sample2.json";

export default class DropDownMenu extends Component {
  //Display radio selection by sorting through JSON object
  state = {
    //trackOfItems: {},
    classArr: [],
    class: null,
    weekArr: [],
    week: null,
    dayArr: [],
    day: null,
  };
  //day = []
  //week = []
  //class = []
  countHashMap = {};
  choice = {};

  createDayOptions(days) {
    if (this.state.dayArr.length > 0) {
      let choices = this.state.dayArr.map((day) => {
        let label =
          this.countHashMap[day] > 1
            ? day + ` (${this.countHashMap[day]})`
            : day;
        return (
          <label>
            <input
              type="radio"
              id={day}
              onClick={this.makeChangesToChoice}
              name="day"
            />
            {label}
          </label>
        );
      });
      return choices;
    }
  }

  createWeekOptions(weeks) {
    if (this.state.weekArr.length > 0) {
      let choices = this.state.weekArr.map((week) => {
        let label =
          this.countHashMap[week] > 1
            ? week + ` (${this.countHashMap[week]})`
            : week;
        return (
          <label>
            <input
              type="radio"
              id={week}
              onClick={this.makeChangesToChoice}
              name="week"
            />
            {label}
          </label>
        );
      });
      return choices;
    }
  }

  createClassOptions(classes) {
    if (this.state.classArr.length > 0) {
      let choices = this.state.classArr.map((Class) => {
        // create a label where more than 1 instance is showned in the label
        let label =
          this.countHashMap[Class] > 1
            ? Class + ` (${this.countHashMap[Class]})`
            : Class;
        return (
          <label>
            <input
              type="radio"
              id={Class}
              onClick={this.makeChangesToChoice}
              name="class"
            />
            {label}
          </label>
        );
      });
      return choices;
    }
  }

  // This function loops over JSON object and creates the radio buttons needed for selections
  createSelectionOptions(json) {
    let Class = [];
    let week = [];
    let day = [];
    json.forEach((division) => {
      // check if a class has already poped up
      if (this.countHashMap[division.class]) {
        this.countHashMap[division.class]++;
      } else {
        this.countHashMap[division.class] = 1;
        Class.push(division.class);
      }

      if (this.countHashMap[division.week]) {
        this.countHashMap[division.week]++;
      } else {
        this.countHashMap[division.week] = 1;
        week.push(division.week);
      }

      if (this.countHashMap[division.day]) {
        this.countHashMap[division.day]++;
      } else {
        this.countHashMap[division.day] = 1;
        day.push(division.day);
      }
    });

    this.setState({ classArr: Class, weekArr: week, dayArr: day });
  }

  // Allow for radio buttons to update the choice made by admin
  makeChangesToChoice = (e) => {
    if (e.target.name === "day") {
      this.setState({ day: e.target.id });
      this.choice.day = e.target.id;
    } else if (e.target.name === "week") {
      this.setState({ week: e.target.id });
      this.choice.week = e.target.id;
    } else if (e.target.name === "class") {
      this.setState({ class: e.target.id });
      this.choice.class = e.target.id;
    }
  };

  // Make drop down menu options
  createDropDownMenuOptions() {
    let dropDownMenuChoices = JSON.filter(
      (divsion) =>
        divsion.day === this.state.day &&
        divsion.week === this.state.week &&
        divsion.class === this.state.class
    );
    let options = dropDownMenuChoices.map((division) => {
      return <option id={division.division}>{division.division}</option>;
    });
    //dropDownMenuChoices.forEach((divsion) => console.log(divsion.division));
    //return <option> hello</option>;
    //console.log(options);
    //console.log(dropDownMenuChoices);
    return options;
  }

  componentDidMount() {
    this.createSelectionOptions(JSON);
  }

  render() {
    return (
      <div>
        <h1> Drop Down Menu</h1>
        <div>
          <p> Class : {this.createClassOptions()}</p>
          <p> Week : {this.createWeekOptions()}</p>
          <p> Day : {this.createDayOptions()}</p>
          <p>
            {" "}
            Division :
            {this.state.day === null ||
            this.state.week === null ||
            this.state.class === null ? (
              <select>
                <option value={null}>
                  Choose a division from the dropdown menu
                </option>
              </select>
            ) : (
              <select>
                <option value={null}>
                  Choose a division from the dropdown menu
                </option>

                {this.createDropDownMenuOptions()}
              </select>
            )}
          </p>
        </div>
        <Division />
        <Unplaced />
        <ScratchPad />
      </div>
    );
  }
}
