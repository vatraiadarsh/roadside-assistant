import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Card, Container, Divider, Grid, Icon, Image, Segment, Label, Loader, Button, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList, makeProfessional } from "../../actions/userActions";

function ManageUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, usrs, error: errorUserList } = userList;

  const makeUserProfessional = useSelector((state) => state.makeUserProfessional);
  const { loading: loadingMakeProfessional, success: successMakeProfessional, error: errorMakeProfessional } = makeUserProfessional;


  useEffect(() => {
    if (userInfo?.role == "admin") {
      dispatch(getUserList());
    } else {
      // send to home page
      navigate("/");
    }
    // when the component unmounts
    if (successMakeProfessional) {
      dispatch(getUserList());
    }
  }, [dispatch,successMakeProfessional, userInfo, userInfo?.role]);



  return (

    <Container >
      <div style={{ marginTop: "12rem" }}></div>
      {loading ? (<Loader active inline='centered' />) : (
        <Segment  >
          {successMakeProfessional && (<Message success content="Role updated successfully." />)}
          {errorMakeProfessional && (<Message error content={errorMakeProfessional} />)}
          <Grid columns={3}>
            <Grid.Row>
              {usrs?.map((usr) => (
                <Grid.Column key={usr._id}>
                  <Card>
                    <Image src={usr?.avatar? usr.avatar : "/noimage.jpg" } wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{usr.title}{" "}{usr.first_name} {usr.last_name}</Card.Header>
                      <Card.Meta>
                        <span className='date'>Date of birth {usr.date_of_birth.toString().slice(0, 10)}</span>
                      </Card.Meta>
                      <Card.Description>
                        {usr.email}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                      {usr.role === "admin" ? (
                        <Label as='a' color='red' ribbon>
                          Admin
                        </Label>
                      ) : ""}

                      {usr.role === "professional" ? (
                        <>
                          <Label color='olive' ribbon>
                            professional
                          </Label>
                          
                          <Button secondary
                            onClick={() => {
                              dispatch(makeProfessional(usr._id));
                            }}
                          >
                            Make User
                          </Button>
                        </>
                      ) : ""}

                      {usr.role === "user" ? (
                        <>
                        <Label color='black' ribbon>
                          User
                        </Label>
                        
                        <Button color='green'
                          onClick={() => {
                            dispatch(makeProfessional(usr._id));
                          }}
                        >
                          Make professional
                        </Button>
                      </>
                      ) : ""}

                    </Card.Content>
                  </Card>
                  <Divider />
                </Grid.Column>

              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      )};


    </Container>
  )
}

export default ManageUsers