import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Segment, Loader } from "semantic-ui-react";
import EditProfile from "../components/Profile/EditProfile";
import ProfileInfo from "../components/Profile/ProfileInfo";
import RequestedService from "../components/Profile/RequestedService";

function ProfilePage() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <Grid
      textAlign="center"
      stackable
      columns={3}
      style={{ marginTop: "5rem" }}
    >

      <Grid.Column>
        <Segment>
          <RequestedService />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <EditProfile />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <ProfileInfo />
        </Segment>
      </Grid.Column>


    </Grid>
  );
}

export default ProfilePage;
