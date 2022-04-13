import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewAllAcceptedService } from '../../actions/serviceRequestActions';
import { Loader, Card, Button, Image, List, Header, Message, Segment, Grid, Divider } from 'semantic-ui-react';




function ApprovedServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const viewAcceptedService = useSelector(state => state.viewAcceptedService);
  const { loading, error, success, acceptedServices } = viewAcceptedService;


  useEffect(() => {
    dispatch(viewAllAcceptedService());
  }, [dispatch,]);


  return (
    <>
      {loading && <Loader active inline="centered" />}
      {error && <Message negative>
        <Message.Header>{error}</Message.Header>
      </Message>}
      {acceptedServices && acceptedServices.map(as => (
        <Segment key={as._id}>
          <Grid columns={2}>
            <Header dividing color='red' size='small' floated='left' as='a'>Approved By:
            </Header>
            <Grid.Row>
              <Grid.Column width={10}>
                <List>
                  <List.Item>
                    <List.Icon name='user' />
                    <List.Content>
                      <Header size='small' floated='left'>{`${as.accepted_by?.title} ${as.accepted_by?.first_name} ${as.accepted_by?.last_name}`}</Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                      <Header size='small' floated='left'>{as.accepted_by?.email}</Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>
                      <Header size='small' floated='left'>{as.accepted_by?.mobile_number}</Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='location arrow' />
                    <List.Content>
                      <Header size='small' floated='left'>{as.accepted_by?.address}</Header>
                    </List.Content>
                  </List.Item>
                  <Divider />
                  {as.status === 'Paid' && <List.Item>
                    <List.Icon color='purple' name='check' />
                    <List.Content>
                      <Header color='purple' size='small' floated='left'>{`${as.status} $${as.price}`}</Header>
                    </List.Content>
                  </List.Item>}
                  {as.status === 'Accepted' &&
                    <List.Item header >
                      <div className='ui two buttons'>
                        <form action={`/create-checkout-session/${as._id}`} method="POST">
                          <Button type='submit' basic color='green'>
                            <Header size='small' >Pay ${as.price}</Header>
                          </Button>
                        </form>
                        <Button disabled basic color='red'>
                          Decline
                        </Button>
                      </div>
                    </List.Item>
                  }

                </List>
              </Grid.Column>
              <Grid.Column width={6}>
                <Image
                  floated='right'
                  size='medium'
                  src={as.accepted_by?.avatar ? as.accepted_by.avatar : '/noimage.jpg'}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Segment>
      ))}

    </>
  )
}

export default ApprovedServices