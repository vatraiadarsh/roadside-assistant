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
    <Container text style={{ marginTop: '7em' }}>

      <h1>Please sign in</h1>

      <br></br>
      <br></br>

        <Form>
        
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
         
        </Form>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        
      </Container>
    </>
  );
};

export default RegisterPage;
