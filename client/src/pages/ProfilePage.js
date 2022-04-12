import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Menu, Segment, Loader } from "semantic-ui-react";
import EditProfile from "../components/Profile/EditProfile";
import ProfileInfo from "../components/Profile/ProfileInfo";
import RequestedService from "../components/Profile/RequestedService";

function ProfilePage() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [state, setState] = React.useState('profileInfo');

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (

<Grid
      textAlign="center"
      stackable
      columns={4}
      style={{ marginTop: "5rem" }}
    >
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            name="profile"
            active={state === 'profileInfo'}
            onClick={() => {
              setState('profileInfo');
            }}
          />
          <Menu.Item
            name="edit profile"
            active={state === 'editProfile'}
            onClick={() => {
              setState('editProfile');
            }}
          
          />
          <Menu.Item
            name="requested services"
            active={state === 'requestedServices'}
            onClick={() => {
              setState('requestedServices');
            }}
          />
        </Menu>
      </Grid.Column>
      {state === 'profileInfo' && (
        <Grid.Column stretched width={8}>
          <Segment>
            <ProfileInfo />
          </Segment>
        </Grid.Column>
      )}
      {state === 'editProfile' && (
        <Grid.Column width={8}>
          <Segment>
            <EditProfile />

          </Segment>
        </Grid.Column>
      )}
      {state === 'requestedServices' && (
        <Grid.Column width={8}>
          <Segment>
            <RequestedService />
          </Segment>
        </Grid.Column>
      )}
      
    </Grid>
  );
}

export default ProfilePage;
