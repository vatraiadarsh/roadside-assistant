import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Card, Container, Divider, Grid, Icon, Image, Segment,Loader } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from "../../actions/userActions";

function ManageUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo,  } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, usrs, error: errorUserList } = userList;

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
      {loading ? ( <Loader active inline='centered' />) : (
         <Segment  >
         <Grid columns={3}>
           <Grid.Row>
             {usrs?.map((usr) => (
                 <Grid.Column key={usr._id}>
                   <Card>
                     <Image src={`http://localhost:3000/${usr.avatar}`} wrapped ui={false} />
                     <Card.Content>
                       <Card.Header>{usr.title}{" "}{usr.first_name} {usr.last_name}</Card.Header>
                       <Card.Meta>
                         <span className='date'>Date of birth {usr.date_of_birth.toString().slice(0,10)}</span>
                       </Card.Meta>
                       <Card.Description>
                         {usr.email}
                       </Card.Description>
                     </Card.Content>
                     <Card.Content extra>
                       <a>
                         <Icon name='user' />
                         {usr.role}
                       </a>
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