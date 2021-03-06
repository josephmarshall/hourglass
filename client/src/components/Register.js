import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Button, Form, Segment, Header, Icon } from "semantic-ui-react";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    nickname: "",
    image: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      passwordConfirmation,
      name,
      nickname,
      image
    } = this.state;
    const {
      auth: { handleRegister },
      history
    } = this.props;

    if (password === passwordConfirmation)
      handleRegister(
        { email, password, passwordConfirmation, name, nickname, image },
        history
      );
    else alert("Passwords Do Not Match!");
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      name,
      nickname
    } = this.state;

    return (
      <Segment basic>
        <Header as="h1" textAlign="center">
          Register
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            required
            autoFocus
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Name"
            required
            autoFocus
            name="name"
            value={name}
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Nickname"
            autoFocus
            name="nickname"
            value={nickname}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            minLength="8"
          />
          <Form.Input
            label="Password Confirmation"
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Password Confirmation"
            type="password"
            onChange={this.handleChange}
            minLength="8"
          />
          <Segment textAlign="center" basic>
            <Button
              animated="vertical"
              type="submit"
              style={{ color: "white", background: "RebeccaPurple" }}
            >
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="paper plane outline" />
              </Button.Content>
            </Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
