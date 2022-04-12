import React, { useEffect } from 'react'
import { Message,Loader, Segment, List, Grid, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { userRequestedServices } from "../../actions/serviceRequestActions";

function RequestedService() {
  const dispatch = useDispatch();

  const userRequestedService = useSelector(state => state.userRequestedService);
  const { loading, error, success, services } = userRequestedService;



  useEffect(() => {
    dispatch(userRequestedServices());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader active inline="centered" />}
      {error && <Message negative>
        <Message.Header>{error}</Message.Header>
      </Message>}
      {services && services.map(service => (
        <Segment key={service._id}>
        <List divided relaxed>
          <List.Item>
            <List.Icon name='car' size='large' verticalAlign='middle' />
            <List.Content >
              <Header  size='small' floated='left' as='a'>Car Details:</Header>
              <List.Description as='a'> {service.model} {service.make} {service.year} {service.number_plate}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
            <List.Content>
              <Header size='small' floated='left' as='a'>Service Required In: </Header>
              <List.Description as='a'>{service.service_requiredin_address}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='wrench' size='large' verticalAlign='middle' />
            <List.Content>
              <Header size='small' floated='left' as='a'>Service Type: </Header>
              <List.Description as='a'>{service.service_type}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mix' size='large' verticalAlign='middle' />
            <List.Content>
              <Header size='small' floated='left' as='a'>Service Description:</Header>
              <List.Description as='a'> {service.service_description}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='location arrow' size='large' verticalAlign='middle' />
            <List.Content>
              <Header size='small' floated='left' as='a'>latitude and longitude:</Header>
              <List.Description as='a'> {service.service_requiredin_lat},{service.service_requiredin_long}</List.Description>
            </List.Content>

          </List.Item>
        </List>
      </Segment>


      ))}


    </>
  )
}

export default RequestedService