import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Form, Segment, Button, Icon, Message,Image } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { gender as g, title as t } from "../../utils/index";
import { updateProfile } from "../../actions/userActions";

function EditProfile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { loading, error, success } = profileUpdate;

  const formatted_date = userInfo?.date_of_birth.split("T")[0] || "";

  const INITIAL_STATE = {
    title: userInfo?.title,
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    gender: userInfo?.gender,
    email: userInfo?.email,
    date_of_birth: formatted_date,
    mobile_number: userInfo?.mobile_number,
    address: userInfo?.address,
    avatar:userInfo?.avatar,
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

  const uploadFileHandler = async(e) => {
   
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
   
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setUser((prevState) => ({ ...prevState, avatar: data }));

    } catch (error) {
      console.log(error);
    }

  }

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
      avatar
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
        mobile_number,
        avatar
      )
    );
  };

  useEffect(() => {
    // watch for the success of profile update
    // if profile is updated eg:Name : instead of updating every piece of component(Header,ProfileInfo),
    //  i have just reloaded the window where redux store will fetch the updated data from local storage.
    if (success) {
      window.location.reload();
    }


    if (
      user.title === userInfo?.title &&
      user.first_name === userInfo?.first_name &&
      user.last_name === userInfo?.last_name &&
      user.gender === userInfo?.gender &&
      user.email === userInfo?.email &&
      user.date_of_birth === userInfo?.date_of_birth.slice(0, 10) &&
      user.mobile_number === userInfo?.mobile_number &&
      user.address === userInfo?.address,
      user.avatar === userInfo?.avatar
     
    ) {
      console.log()
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user, userInfo, success]);

  return (
    <>
      <Message success hidden={!success}>
        <Message.Header>Profile Updated Successfully</Message.Header>
      </Message>
      <Message error hidden={!error}>
        <Message.Header>{error}</Message.Header>
      </Message>
      <div style={{ marginBottom: "1rem" }}>
        <Icon name="edit" />
        Edit Profile
      </div>
      <Form loading={loading} onSubmit={handleSubmit}>
        <Segment stacked color="green">
          <Form.Select
            fluid
            options={t}
            placeholder="Title"
            name="title"
            onChange={handleSelectChange}
            value={user.title}
            required
          />

          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="First Name"
            onChange={handleChange}
            name="first_name"
            value={user.first_name}
            required
          />
          <Form.Input
            fluid
            icon="user outline"
            iconPosition="left"
            placeholder="Last Name"
            onChange={handleChange}
            name="last_name"
            value={user.last_name}
            required
          />
          <Form.Select
            fluid
            options={g}
            placeholder="Gender"
            onChange={handleSelectChange}
            name="gender"
            value={user.gender}
            required
          />

          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="E-mail address"
            onChange={handleChange}
            name="email"
            value={user.email}
            required
          />

          <Form.Input
            fluid
            type="date"
            onChange={handleChange}
            iconPosition="left"
            icon="calendar"
            name="date_of_birth"
            value={user.date_of_birth}
            required
          />

          <Form.Input
              fluid
              type="file"
              onChange={uploadFileHandler}
              iconPosition="left"
              icon="upload"   
              id="avatar"       
          />


          <Image style={{marginBottom:13}} size="small" src={"/uploads"+user.avatar} />
          

          <Form.Input
            fluid
            icon="phone"
            type="number"
            iconPosition="left"
            placeholder="Mobile Number"
            onChange={handleChange}
            name="mobile_number"
            value={user.mobile_number}
            required
          />

          <Form.Input
            fluid
            icon="home"
            iconPosition="left"
            placeholder="Address"
            onChange={handleChange}
            name="address"
            value={user.address}
            required
          />

          <Button
            disabled={disabled || success}
            color="green"
            fluid
            size="large"
          >
            Update Profile
          </Button>
        </Segment>
      </Form>
    </>
  );
}

export default EditProfile;
