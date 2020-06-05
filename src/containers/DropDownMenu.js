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
    division: null,
  };

  arrayOfDivisions = [];
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

  // Use classArr to loop through class options
  createClassOptions(classes) {
    if (this.state.classArr.length > 0) {
      let choices = this.state.classArr.map((Class) => {
        // Use a hash map object to keep trackOfItems
        // If one class already exists, just include one instance of it and the total number of times this class came up
        // Else just include the class with no numbers (hence only appeared once)
        let label =
          this.countHashMap[Class] > 1
            ? Class + ` (${this.countHashMap[Class]})`
            : Class;
        // Return a input radio button with the class name
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

  updateState(e) {
    console.log(e.target.id);
    this.setState({ division: e.target.id });
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
  createDivisionOptions() {
    // Use Filter function to get corresponding options
    let dropDownMenuChoices = JSON.filter(
      (divsion) =>
        divsion.day === this.choice.day &&
        divsion.week === this.choice.week &&
        divsion.class === this.choice.class
    );

    // Loop through options and display as a option in drop down menu
    let options = dropDownMenuChoices.map((division) => {
      return (
        <option onClick={this.updateState} id={division.division}>
          {division.division}
        </option>
      );
    });
    //if (dropDownMenuChoices.length === 0) this.setState({ division: null });
    this.arrayOfDivisions = dropDownMenuChoices;
    return options;
  }

  componentDidMount() {
    this.createSelectionOptions(JSON);
  }

  updateState = this.updateState.bind(this);
  componentDidUpdate(prevProps, prevState) {
    //console.log(this.choice);
    //this.updateState = this.updateState.bind(this);
    //Object.entries(this.props).forEach(
    //([key, val]) =>
    //prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    //);
    //if (this.state) {
    //Object.entries(this.state).forEach(
    //([key, val]) =>
    //prevState[key] !== val && console.log(`State '${key}' changed`)
    //);
    //}
  }
  count = 0;
  render() {
    //console.log("rendered" + this.count++);
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
            {this.choice.day === null ||
            this.choice.week === null ||
            this.choice.class === null ? (
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
                {this.createDivisionOptions()}
              </select>
            )}
          </p>
        </div>
        <Division
          listOfDivisions={this.arrayOfDivisions}
          division={this.state.division}
        />
        <Unplaced />
        <ScratchPad />
      </div>
    );
  }
}
