import React from "react";
import {
  Container,
  Message,
  Form,
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <Container text>
        <Message
          attached
          icon="settings"
          header="Get Started"
          content="Create a new account"
        />

        <Form>
          <Segment>
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <Button
              content="SignIn"
              type="submit"
              icon="sign in"
              color="facebook"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="user circle" />
          Doesn't had an account? &nbsp;
          <Link to="/register">
            <a>Register here</a>&nbsp;
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
};

export default RegisterPage;
