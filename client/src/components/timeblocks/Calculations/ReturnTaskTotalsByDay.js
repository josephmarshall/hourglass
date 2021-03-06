import moment from "moment";

export const returnTaskTotalsByDay = (week, monday) => {
  let mondayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("DD") === moment(monday).format("DD")
  );
  let tuesdayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(1, "days")
        .format("dd")
  );
  let wednesdayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(2, "days")
        .format("dd")
  );
  let thursdayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(3, "days")
        .format("dd")
  );
  let fridayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(4, "days")
        .format("dd")
  );
  let saturdayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(5, "days")
        .format("dd")
  );
  let sundayTimeBlocks = week.filter(
    wtb =>
      moment(wtb.start_time).format("dd") ===
      moment(monday)
        .add(6, "days")
        .format("dd")
  );
  return [
    mondayTimeBlocks,
    tuesdayTimeBlocks,
    wednesdayTimeBlocks,
    thursdayTimeBlocks,
    fridayTimeBlocks,
    saturdayTimeBlocks,
    sundayTimeBlocks
  ];
};
