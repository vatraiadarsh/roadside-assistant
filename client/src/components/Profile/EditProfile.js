import React, { useEffect, useState } from "react";
import { Form, Segment, Button, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { gender as g, title as t } from "../../utils/index";
import { updateProfile } from "../../actions/userActions";

function EditProfile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const formatted_date = (userInfo?.date_of_birth.split("T")[0] || "");
  console.log(formatted_date);

  const INITIAL_STATE = {
    title: userInfo?.title,
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    gender: userInfo?.gender,
    email: userInfo?.email,
    date_of_birth: formatted_date,
    mobile_number: userInfo?.mobile_number,
    address: userInfo?.address,
  };

  const [user, setUser] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e, result) => {
    const { name, value } = result;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const {
      title,
      first_name,
      last_name,
      email,
      gender,
      date_of_birth,
      address,
      mobile_number,
    } = user;
    e.preventDefault();
    dispatch(
      updateProfile(
        title,
        first_name,
        last_name,
        email,
        gender,
        date_of_birth,
        address,
        mobile_number
      )
    );
    console.log(user);
  };

  useEffect(() => {
    if (
      user.title === userInfo?.title &&
      user.first_name === userInfo?.first_name &&
      user.last_name === userInfo?.last_name &&
      user.gender === userInfo?.gender &&
      user.email === userInfo?.email &&
      user.date_of_birth === userInfo?.date_of_birth.slice(0, 10) &&
      user.mobile_number === userInfo?.mobile_number &&
      user.address === userInfo?.address
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user, userInfo]);
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Icon name="edit" />
        Edit Profile
      </div>
      <Form onSubmit={handleSubmit}>
        <Segment stacked color="green">
          <Form.Select
            fluid
            options={t}
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
            name="first_name"
            value={user.first_name}
          />
          <Form.Input
            fluid
            icon="user outline"
            iconPosition="left"
            placeholder="Last Name"
            onChange={handleChange}
            name="last_name"
            value={user.last_name}
          />
          <Form.Select
            fluid
            options={g}
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

          <Button disabled={disabled} color="green" fluid size="large">
            Update Profile
          </Button>
        </Segment>
      </Form>
    </>
  );
}

export default EditProfile;
