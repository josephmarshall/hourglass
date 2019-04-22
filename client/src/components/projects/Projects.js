import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Container,
  Icon,
  Table,
  Menu,
  Progress
} from "semantic-ui-react";
import BudgetView from "./BudgetView";
import ModalForms from "./ProjectModals/ProjectCreate/ModalForms";
import EditProjectModal from "./ProjectModals/ProjectEdit/EditModalForms";
import "./Projects.css";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

class Projects extends React.Component {
  state = { projects: [], toggleForm: false, project: {} };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    axios
      .get("api/project/projects_with_data")
      .then(res => this.setState({ projects: res.data }));
  };

  // handleToggle = (project) => {
  //   this.setState({ toggleForm: !this.state.toggleForm, project: project });
  // };

  showProjects = () => {
    return this.state.projects.map(p => (
      <>
        <Table.Row key={p.project_id} className="projectRow">
          <Table.Cell
            onClick={() => this.props.history.push(`/projects/${p.project_id}`)}
            style={{
              fontWeight: "bold",
              fontSize: "1.2em"
            }}
          >
            {p.project_name
              ? p.project_name + (p.client_name && ` (${p.client_name})`)
              : "Project"}
          </Table.Cell>
          <Table.Cell>
            {p.budget && `$${parseFloat(p.budget).toFixed(2)}`}
          </Table.Cell>
          <Table.Cell style={{ width: "5%" }}>
            {p.total_project_cost && `$${p.total_project_cost.toFixed(0)}`}
          </Table.Cell>
          <Table.Cell>
            <StyledProgressBar>
              <Progress
                color={this.renderProgress(p.percent_spent)}
                percent={p.percent_spent}
              />
            </StyledProgressBar>
          </Table.Cell>
          <Table.Cell>
            {p.percent_spent ? p.percent_spent.toFixed(0) : 0}%
          </Table.Cell>
          <Table.Cell>
            <EditProjectModal getProjects={this.getProjects} project={p} />
          </Table.Cell>
        </Table.Row>
      </>
    ));
  };

  renderProgress = percent_spent => {
    switch (true) {
      case percent_spent > 70 && percent_spent < 100:
        return "orange";
      case percent_spent < 70:
        return "green";
      case percent_spent > 100:
        return "red";
      case percent_spent === 0:
        return "grey";
    }
  };

  render() {
    return (
      <>
        <ModalForms getProjects={this.getProjects} />
        <div style={{ padding: "10px" }}>
          <Table stackable basic collapsing style={{ width: "100%" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Project</Table.HeaderCell>
                <Table.HeaderCell>Budget</Table.HeaderCell>
                <Table.HeaderCell
                  colSpan="2"
                  style={{ width: "25%" }}
                  textAlign="center"
                >
                  Current Cost
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell style={{ width: "5%" }} />
              </Table.Row>
            </Table.Header>
            {this.showProjects()}
          </Table>
        </div>
      </>
    );
  }
}

export default withRouter(Projects);

const StyledProgressBar = styled.div`
  .ui.progress .bar {
    display: block;
    line-height: 1;
    position: relative;
    width: 0%;
    min-width: 0.2em;
    background: #888;
    border-radius: 0.28571429rem;
    transition: width 0.1s ease, background-color 0.1s ease;
    transition-property: width, background-color;
    transition-duration: 0.1s, 0.1s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
  }
`;
