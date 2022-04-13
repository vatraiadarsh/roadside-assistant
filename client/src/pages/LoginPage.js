import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
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
import {useSelector,useDispatch} from "react-redux";
import {login} from "../actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error, success } = userLogin;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { email, password } = formData;
    const validateUser = email !== "" && password !== "";
    validateUser ? setDisabled(false) : setDisabled(true);

    if (success) {
      navigate("/profile");
    }

  }, [formData,success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
       <Message info>
          <Message.Header>Choose how you want to login</Message.Header>
          <br/>
          <Message.Content>
            <p><i>admin@example.com</i>, password:<i>admin</i></p>
            <p><i>professional@example.com</i>, professional:<i>admin</i></p>
            <p><i>user@example.com</i>, password:<i>user</i></p>
          </Message.Content>

       </Message>
        <Header as="h2" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        {error && <Message error content={error} />}

        <Form loading={loading} onSubmit={handleSubmit}>
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
