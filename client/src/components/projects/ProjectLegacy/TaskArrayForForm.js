import React from "react";
import {
  Container,
  Divider,
  Header,
  Form,
  Table,
  Card
} from "semantic-ui-react";
import axios from "axios";
import TaskViewForForm from "./TaskViewForForm";
import TaskForm from "./TaskForm";

class TaskArrayForForm extends React.Component {
  state = { tasks: [], loaded: false };

  componentDidMount = () => {
    const { tasks } = this.state;
    const { project_id } = this.props;
    axios
      .get(`/api/${project_id}/view_tasks`)
      .then(res => this.setState({ tasks: res.data }));
  };

  resetState = task => {
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  showTasks = () => {
    return this.state.tasks.map(task => (
      <>
        <TaskViewForForm
          resetState={this.resetState}
          task={task}
          removeTask={this.removeTask}
          project_id={this.props.project_id}
        />
      </>
    ));
  };

  removeTask = id => {
    this.setState({ tasks: this.state.tasks.filter(t => t.id !== id) });
  };

  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">
          Tasks
        </Header>
        {this.state.tasks.length !== 0 ? (
          <>
            <Table compact basic fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Price per Hour</Table.HeaderCell>
                  <Table.HeaderCell>Billable</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.showTasks()}</Table.Body>
            </Table>
          </>
        ) : null}
        <TaskForm
          editing={this.state.editing}
          resetState={this.resetState}
          project_id={this.props.project_id}
          showTasks={this.showTasks()}
          handleToggle={this.props.handleToggle}
        />
      </div>
    );
  }
}

export default TaskArrayForForm;
