import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { email, password } = formData;
    const validateUser = email !== "" && password !== "";
    validateUser ? setDisabled(false) : setDisabled(true);
    console.log(validateUser);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
              value={formData.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
              value={formData.password}
            />

            <Button disabled={disabled} color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? &nbsp;<Link to={"/register"}>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
