import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Grid, Menu, Segment, Message } from "semantic-ui-react";
import EditProfile from "../components/Profile/EditProfile";
import ProfileInfo from "../components/Profile/ProfileInfo";
import RequestedService from "../components/Profile/RequestedService";
import ApprovedServices from "../components/Profile/ApprovedServices";
import { viewAllAcceptedService } from "../actions/serviceRequestActions";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [state, setState] = React.useState('profileInfo');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [PaymentFailure, setPaymentFailure] = useState(false);


  useEffect(() => {
    //  Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setPaymentSuccess(true);
      dispatch(viewAllAcceptedService());
      setState("approvedServices");


    }

    if (query.get("canceled")) {
      setPaymentFailure(true);
      setState("approvedServices");
    }
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
          <Menu.Item
            name="approved services"
            active={state === 'approvedServices'}
            onClick={() => {
              setState('approvedServices');
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
      {state === 'approvedServices' && (
        <Grid.Column width={8}>
          <Segment>
            {PaymentFailure && <Message negative>
              <Message.Header>Payment canceled. Please try again or contact us for assistance.</Message.Header>
            </Message>}
            {paymentSuccess && <Message positive>
              <Message.Header>Payment successful. Thank you for your payment.</Message.Header>
            </Message>}
            <Message info>
              <Message.Header>Fake cards for payment</Message.Header>
              <Message.Content>
                <Message.List>
                  <Message.Item>
                    <b>Visa</b>
                    <p> Card Number: 4242 4242 4242 4242
                      <br />
                      Exp: Any future date
                      <br />
                      CVV: Any 3 digits
                    </p>
                  </Message.Item>
                  <Message.Item>
                    <b>Mastercard</b>
                    <p>Card Number: 5555 5555 5555 4444
                      <br />
                      Exp: Any future date
                      <br />
                      CVV: Any 3 digits
                    </p>
                  </Message.Item>
                </Message.List>
              </Message.Content>
            </Message>


            <ApprovedServices />
          </Segment>
        </Grid.Column>
      )}


    </Grid>
  );
}

export default ProfilePage;
