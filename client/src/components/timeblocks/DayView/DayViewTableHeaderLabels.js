import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import { returnHoursSplitByDay } from "../Calculations/ReturnHoursSplitByDay";
import clickHandler from "../NavBarComponents/TimeSheetNavbarClickHandler";
import "../timeSheetDayView.css";

class TableHeaderLabels extends React.Component {
  state = {
    hours: {
      mondayHours: 0,
      tuesdayHours: 0,
      wednesdayHours: 0,
      thursdayHours: 0,
      fridayHours: 0,
      saturdayHours: 0,
      sundayHours: 0,
      total: 40
    }
  };

  key;

  componentDidMount = () => {
    const { currentWeekTimeBlocks, monday } = this.props;
    this.setState({
      hours: returnHoursSplitByDay(currentWeekTimeBlocks, monday)
    });
  };

  componentDidUpdate = prevProps => {
    const { currentWeekTimeBlocks, monday } = this.props;
    if (prevProps.currentWeekTimeBlocks !== this.props.currentWeekTimeBlocks)
      this.setState({
        hours: returnHoursSplitByDay(currentWeekTimeBlocks, monday)
      });
  };

  render() {
    const {
      monday,
      setSelectedDate,
      setSelectedWeek
    } = this.props;

    const mondayDay = moment(monday).format("dd");

    const tuesdayDay = moment(monday)
      .add(1, "days")
      .format("dd");

    const wednesdayDay = moment(monday)
      .add(2, "days")
      .format("dd");

    const thursdayDay = moment(monday)
      .add(3, "days")
      .format("dd");

    const fridayDay = moment(monday)
      .add(4, "days")
      .format("dd");

    const saturdayDay = moment(monday)
      .add(5, "days")
      .format("dd");

    const sundayDay = moment(monday)
      .add(6, "days")
      .format("dd");

    const {
      mondayHours,
      tuesdayHours,
      wednesdayHours,
      thursdayHours,
      fridayHours,
      saturdayHours,
      sundayHours
    } = this.state.hours;
    const days = [
      { dayofweek: mondayDay, totalHours: mondayHours.toFixed(2) },
      { dayofweek: tuesdayDay, totalHours: tuesdayHours.toFixed(2) },
      { dayofweek: wednesdayDay, totalHours: wednesdayHours.toFixed(2) },
      { dayofweek: thursdayDay, totalHours: thursdayHours.toFixed(2) },
      { dayofweek: fridayDay, totalHours: fridayHours.toFixed(2) },
      { dayofweek: saturdayDay, totalHours: saturdayHours.toFixed(2) },
      { dayofweek: sundayDay, totalHours: sundayHours.toFixed(2) },
      {
        dayofweek: "Weekly Total",
        totalHours: this.state.hours.total.toFixed(2)
      }
    ];

    return (
      <>
        <Table.Cell id="emptycell" style={{ width: "20%" }} />
        {days.map(cell => (
          <Table.HeaderCell
            key={cell.dayofweek}
            className="dayViewTableHeaderCell"
            onClick={() =>
              clickHandler(
                monday,
                cell.dayofweek,
                setSelectedDate,
                setSelectedWeek
              )
            }
            style={
              cell.dayofweek === moment(this.props.selectedDate).format("dd")
                ? styles.highlight
                : styles.normal
            }
          >
            <div>{cell.dayofweek}</div>
            <div style={{ textAlign: "center" }}>{cell.totalHours}</div>
          </Table.HeaderCell>
        ))}
      </>
    );
  }
}

export default TableHeaderLabels;

const styles = {
  highlight: {
    background: "RebeccaPurple",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.1em",
    padding: "4px",
    cursor: "pointer",
    width: "102px"
  },
  normal: {
    textAlign: "center",
    fontSize: "1.1em",
    padding: "4px",
    cursor: "pointer",
    width: "102px"
  }
};
