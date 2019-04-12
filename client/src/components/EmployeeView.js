import React, { useReducer } from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Segment, Header, Image, List, Divider } from "semantic-ui-react";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class Employee extends React.Component {
  state = {
    projects: [],
    timeblocks: [],
    user: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/users/${id}/projects`)
      .then(res => this.setState({ projects: res.data }));
    axios
      .get(`/api/users/${id}/timeblocks`)
      .then(res => this.setState({ timeblocks: res.data }));
    axios
      .get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data }));
  }

  // <List divided relaxed>
  // <List.Item>
  //   <List.Icon name='github' size='large' verticalAlign='middle' />
  //   <List.Content>
  //     <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
  //     <List.Description as='a'>Updated 10 mins ago</List.Description>
  //   </List.Content>
  // </List.Item>

  render() {
    const { user } = this.state;
    return (
      <>
        <Segment>
          <Image circular centered src={defaultImage || user.image} />
          <Header textAlign="center">{user.name}</Header>
        </Segment>
        <Header as="h1" textAlign="center">
          Projects
        </Header>
        <Divider />
        <List animated>
          {this.state.projects.map(project => (
            <List.Item style={{ textAlign: "center" }}>
              <List.Content>
                <Link to={`/projects/${project.id}`}>
                  <List.Header as="h3" style={{ color: "purple" }}>
                    {project.name}
                  </List.Header>
                </Link>
                <List.Description>put hours here</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Divider />
        <Header as="h1" textAlign="center">
          Tasks
        </Header>
        <Divider />
      </>
    );
  }
}

export default class ConnectedEmployee extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Employee {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
