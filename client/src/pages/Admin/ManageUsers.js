import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Card, Container, Divider, Grid, Icon, Image, Segment,Label, Loader, Button, Message } from 'semantic-ui-react';
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
  }, [dispatch, userInfo, userInfo?.role]);



  return (

    <Container >
      <div style={{ marginTop: "12rem" }}></div>
      {loading ? (<Loader active inline='centered' />) : (
        <Segment  >
         {successMakeProfessional && (<Message success content="User is now a professional" />)}
          {errorMakeProfessional && (<Message error content={errorMakeProfessional} />)}
          <Grid columns={3}>
            <Grid.Row>
              {usrs?.map((usr) => (
                <Grid.Column key={usr._id}>
                  <Card>
                 
                    <Image src={`http://localhost:3000/${usr.avatar}`} wrapped ui={false} />
                  
                   

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
                        // <a color='blue'>
                        //   <Icon name='user' />
                        //   {usr?.role}
                        // </a>
                        <Label as='a' color='red' ribbon>
                        Admin
                      </Label>
                      ):""}

                      {usr.role === "professional" ? (
                        <Label as='a' color='black' ribbon>
                        professional
                      </Label>
                      ):""}
                      
                      {usr.role === "user" ? (
                        <div className='ui two buttons'>
                          <Button>
                            <a>
                              <Icon name='user' />
                              {usr.role}
                            </a>
                          </Button>
                          <Button secondary 
                            onClick={() => {
                              dispatch(makeProfessional(usr._id));
                              dispatch(getUserList());
                            }}
                            >
                            Make Professional
                          </Button>
                      
                         
                        </div>
                      ):""}

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