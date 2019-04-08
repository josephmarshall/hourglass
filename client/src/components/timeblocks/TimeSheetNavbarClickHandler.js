import moment from "moment";

const TimeSheetNavbarClickHandler = (date, event, task, week) => {
  let newDate;
  switch (event) {
    case "dayLeft":
      newDate = moment(date).subtract(1, "days");
      task(newDate);
      week(newDate);
      break;
    case "dayRight":
      newDate = moment(date).add(1, "days");
      task(newDate);
      week(newDate);
      break;
    case "day":
      task("day");
      break;
    case "week":
      task("week");
      break;
    case "weekLeft":
      newDate = moment(date).subtract(7, "days");
      task(newDate);
      week(newDate);
      break;
    case "weekRight":
      newDate = moment(date).add(7, "days");
      task(newDate);
      week(newDate);
      break;
    case "today":
      newDate = moment();
      task(newDate);
      week(newDate);
      break;
    case "calendarDayPicked":
      task(date);
      break;
    //no default
  }
};

export default TimeSheetNavbarClickHandler;
