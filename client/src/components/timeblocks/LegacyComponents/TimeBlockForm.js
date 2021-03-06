// import React, { Fragment } from "react";
// import { Table, Image, Header, Button, Dropdown } from "semantic-ui-react";
// import moment from "moment";
// import axios from "axios";
// import TimeBlock from "./TimeBlock";
// import styled from "styled-components";

// class TimeBlockForm extends React.Component {
//   state = {
//     project_id: 1,
//     projectName: "Project 1",
//     date: "",
//     startTime: null,
//     endTime: "",
//     totalTime: "",
//     billable: "",
//     unbillable: "",
//     startTimeAmPm: "",
//     endTimeAmPm: "",
//     editMode: this.props.data.editMode
//   };

//   componentDidMount = () => {
//     this.setState({
//       project_id: this.props.project_id,
//       startTime: this.props.startTime,
//       endTime: this.props.endTime,
//       billable: this.props.billable,
//       unbillable: this.props.unbillable
//     });
//   };

//   handleSubmit = e => {
//     e && e.preventDefault();
//     const {
//       data: { id }
//     } = this.props;

//     const start_time = moment(
//       `2019-${this.state.startTimeMonth}-${this.state.startTimeDay} ${
//         this.state.startTimeHour
//       }:${this.state.startTimeMinute} ${this.state.startTimeAmPm}`
//     );

//     const end_time = moment(
//       `2019-${this.state.endTimeMonth}-${this.state.endTimeDay} ${
//         this.state.endTimeHour
//       }:${this.state.endTimeMinute} ${this.state.endTimeAmPm}`
//     );

//     console.log(start_time);
//     const timeblock = {
//       start_time,
//       end_time,
//       //      billable,
//       user_id: 8,
//       project_id: 1
//     };

//     axios.put(`/api/timeblocks/${id}`, timeblock).then(res => {
//       this.props.updateTimeBlock(res.data);
//     });
//     this.toggleEditMode();
//   };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleChange1 = e => {
//     this.setState({ startTimeAmPm: e.target.textContent });
//   };

//   handleChange2 = e => {
//     this.setState({ endTimeAmPm: e.target.textContent });
//   };

//   startButton = () => {
//     const task_id = 1;
//     // const { project_id } = this.props;
//     let t = new moment();
//     const timeBlock = { task_id, start_time: t, user_id: 8 }; ///////need to pull from auth
//     axios.post(`/api/timeblocks`, timeBlock).then(res => {
//       this.props.addTimeBlock(res.data);
//     });
//   };

//   toggleEditMode = () => {
//     this.setState({ editMode: !this.state.editMode });
//   };

//   stopButton = id => {
//     const createNewDate = new moment();
//     const calcs = this.calculateTimeBlock(
//       this.props.data.startTime,
//       createNewDate,
//       this.state.billable
//     );
//     axios
//       .put(`/api/timeblocks/${id}`, {
//         end_time: createNewDate,
//         billable: this.state.billable,
//         unbillable: calcs.unbillable
//       })
//       .then(res =>
//         this.props.updateBlocks({ totalTime: calcs.totalTime, ...res.data })
//       );
//   };

//   calculateTimeBlock = (start, stop, billable) => {
//     const totalTime = moment
//       .utc(moment.duration(stop.diff(start)).asMilliseconds())
//       .format("HH.H");
//     const unbillable = totalTime - billable;
//     const calcs = { totalTime, unbillable };
//     return calcs;
//   };

//   editButtons = () => {
//     return (
//       <>
//         <Button
//           circular
//           icon="checkmark"
//           inverted
//           onClick={() => this.handleSubmit()}
//           name="checkmark"
//           color="green"
//           size="tiny"
//         />
//         <Button
//           circular
//           icon="delete"
//           color="red"
//           inverted
//           onClick={() =>
//             this.props.deleteTimeBlock(
//               this.props.data.id,
//               this.props.data.project_id
//             )
//           }
//           name="delete"
//           size="tiny"
//         />
//       </>
//     );
//   };

//   render() {
//     return (
//       <Fragment>
//         {this.state.editMode ? (
//           <Table.Row style={{ padding: 0 }}>
//             <Table.Cell
//               style={{
//                 paddingTop: "3px",
//                 paddingBottom: "3px",
//                 paddingLeft: "5%"
//               }}
//             >
//               <Header as="h4" image>
//                 <Image
//                   style={{ paddingTop: "3px", paddingBottom: "3px" }}
//                   src="https://react.semantic-ui.com/images/avatar/small/lena.png"
//                   rounded
//                   size="mini"
//                 />
//                 <Header.Content>
//                   <Dropdown
//                     inline
//                     name="projectName"
//                     options={[
//                       { key: 1, text: "Project 1", value: "Project 1" },
//                       { key: 2, text: "Project 2", value: "Project 2" }
//                     ]}
//                     onChange={this.handleChange}
//                     defaultValue={"ProjectName"}
//                   />
//                   <Header.Subheader>Team Name</Header.Subheader>
//                 </Header.Content>
//               </Header>
//             </Table.Cell>
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }}>
//               <div>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="startTimeDay"
//                   value={this.state.startTimeDay}
//                   onChange={this.handleChange}
//                   placeholder="dd"
//                 />
//                 <span>/</span>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="startTimeMonth"
//                   value={this.state.startTimeMonth}
//                   onChange={this.handleChange}
//                   placeholder="Mo"
//                 />
//               </div>
//             </Table.Cell>
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }}>
//               <div style={{ display: "flex" }}>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="startTimeHour"
//                   value={this.state.startTimeHour}
//                   onChange={this.handleChange}
//                   placeholder="hh"
//                   maxLength="2"
//                 />
//                 <span>:</span>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="startTimeMinute"
//                   value={this.state.startTimeMinute}
//                   onChange={this.handleChange}
//                   placeholder="mm"
//                   maxLength="2"
//                 />
//                 <SelectStyler>
//                   <Dropdown
//                     id="startTimeAmPm"
//                     inline
//                     name="startTimeAmPm"
//                     options={[
//                       { key: 1, text: "am", value: "am" },
//                       { key: 2, text: "pm", value: "pm" }
//                     ]}
//                     onChange={this.handleChange1}
//                     value={this.state.startTimeAmPm}
//                   />
//                 </SelectStyler>
//               </div>
//             </Table.Cell>
//             <Table.Cell style={{ padding: "3px 2px 3px 2px" }}>
//               <div style={{ display: "flex" }}>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="endTimeHour"
//                   value={this.state.endTimeHour}
//                   onChange={this.handleChange}
//                   placeholder="hh"
//                   maxLength="2"
//                 />
//                 <span>:</span>
//                 <input
//                   style={{ width: "3ch", padding: "1px", borderRadius: 0 }}
//                   name="endTimeMinute"
//                   value={this.state.endTimeMinute}
//                   onChange={this.handleChange}
//                   placeholder="mm"
//                   maxLength="2"
//                 />
//                 <SelectStyler>
//                   <Dropdown
//                     inline
//                     name="endTimeAmPm"
//                     options={[
//                       { key: 1, text: "am", value: "am" },
//                       { key: 2, text: "pm", value: "pm" }
//                     ]}
//                     onChange={this.handleChange2}
//                     value={this.state.endTimeAmPm}
//                   />
//                 </SelectStyler>
//               </div>
//             </Table.Cell>
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }} />
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }}>
//               <input
//                 style={{ width: "4ch", padding: 0, borderRadius: 0 }}
//                 name="billable"
//                 value={this.state.billabe}
//                 onChange={this.handleChange}
//               />{" "}
//             </Table.Cell>
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }}>
//               {this.state.unbillable}
//             </Table.Cell>
//             <Table.Cell />
//             <Table.Cell style={{ padding: "3px 2px 3px 5px" }}>
//               {this.editButtons()}
//             </Table.Cell>
//           </Table.Row>
//         ) : (
//           <TimeBlock
//             data={this.props.data}
//             toggleEditMode={this.toggleEditMode}
//             stop={this.stopButton}
//             start={this.startButton}
//           />
//         )}
//       </Fragment>
//     );
//   }
// }

// export default TimeBlockForm;

// const SelectStyler = styled.div`
//   .ui.selection.dropdown {
//     min-width: 3px;
//     padding: 0;
//   }
// `;
