import React,{useState} from "react";
import { Form, Segment, Button, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { gender as g, title as t } from "../../utils/index";

function EditProfile() {
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo}  = userLogin;

  const formatted_date = new Date(userInfo.date_of_birth).toISOString().slice(0, 10);
  // console.log(formatted_date);


  const INITIAL_STATE = {
    title: userInfo.title,
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    gender: userInfo.gender,
    email: userInfo.email,
    date_of_birth:formatted_date,
    mobile_number: userInfo.mobile_number,
    address: userInfo.address,
  };

  const [user, setUser] = useState(INITIAL_STATE);

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
    //  const {title,first_name,last_name,email,gender,date_of_birth,address,mobile_number} = user;
    e.preventDefault();
    // dispatch(register(title,first_name,last_name,email,gender,date_of_birth,address,mobile_number));
    console.log(user);
  }


  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Icon name="edit" />
        Edit Profile
      </div>
      <Form onSubmit={handleSubmit} >
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
            name="firstName"
            value={user.first_name}
          />
          <Form.Input
            fluid
            icon="user outline"
            iconPosition="left"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastName"
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

          <Button  color="green" fluid size="large">
            Update Profile
          </Button>
        </Segment>
      </Form>
    </>
  );
}

export default EditProfile;
