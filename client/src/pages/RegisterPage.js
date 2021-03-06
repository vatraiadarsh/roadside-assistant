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

import {useDispatch,useSelector} from "react-redux";
import {register} from "../actions/userActions";

const {gender,title} = require("../utils/index");

const Register = () => {

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const {loading,error,success} = userRegister;

  const INITIAL_STATE = {
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    date_of_birth: "",
    mobile_number: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(INITIAL_STATE);
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const validateUser = Object.values(user).every((value) => value !== "");
    validateUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // event.target is a browser event property but Semantic UI components, such as a Dropdown, Checkbox, and Radio
  // do not work directly with native browser form controls such as input and select
  // in the <Checkbox>, <Radio> and <Dropdown> || <Select> components the second argument to onChange will be an object with
  // name, value, and eg: result  (if relevant)

  const handleSelectChange = (e, result) => {
    const { name, value } = result;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    const {title,firstName,lastName,gender,email,date_of_birth,mobile_number,address,password} = user;
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
       setMessage(true);
    }else{
      
    setMessage(false);
    dispatch(register(title,firstName,lastName,gender,email,date_of_birth,mobile_number,address,password));

    }
     };

     


  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          <Image src="/logo.png" /> Register a new account
        </Header>
          {error && <Message error content={error} />}
          {success &&  
            <Message
            success
            header="Thanks for signing Up! "
            content="Please login with your credentials!"
            /> }
          {message && (
            <Message
              color="red"
              header="Please check it out!"
              content={"Password doesnot match"}
            />
          )}
        <Form loading={loading} success={Boolean(success)} error={Boolean(error)} onSubmit={submitHandler}>
          <Segment piled color="blue">
            <Form.Select
              fluid
              options={title}
              placeholder="Title"
              name="title"
              onChange={handleSelectChange}
              value={user.title}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First Name"
              onChange={handleChange}
              name="firstName"
              value={user.firstName}
            />
            <Form.Input
              fluid
              icon="user outline"
              iconPosition="left"
              placeholder="Last Name"
              onChange={handleChange}
              name="lastName"
              value={user.lastName}
            />
            <Form.Select
              fluid
              options={gender}
              placeholder="Gender"
              onChange={handleSelectChange}
              name="gender"
              value={user.gender}
            />

            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
              name="email"
              value={user.email}
            />

            <Form.Input
              fluid
              type="date"
              onChange={handleChange}
              iconPosition="left"
              icon="calendar"
              name="date_of_birth"
              value={user.date_of_birth}
            />

            <Form.Input
              fluid
              icon="phone"
              type="number"
              iconPosition="left"
              placeholder="Mobile Number"
              onChange={handleChange}
              name="mobile_number"
              value={user.mobile_number}
            />

            <Form.Input
              fluid
              icon="home"
              iconPosition="left"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={user.address}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Conform Password"
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={user.confirmPassword}
            />

            <Button
              disabled={disabled || success}
              type="submit"
              color="blue"
              fluid
              size="large"
            >
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? &nbsp;<Link to={"/login"}>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
