import React, { useEffect } from 'react'
import { Message, Segment, List } from 'semantic-ui-react';
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
      {error && <Message negative>
        <Message.Header>{error}</Message.Header>
      </Message>}
      {services && services.map(service => (
        <Segment key={service._id}>
          <List divided relaxed>
            <List.Item>
              <List.Icon name='car' size='large' verticalAlign='middle' />
              <List.Content >
                <List.Header  as='a'>Car Details:</List.Header>
                <List.Description as='a'> {service.model} {service.make} {service.year} {service.number_plate}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Service Required In: </List.Header>
                <List.Description as='a'>{service.service_requiredin_address}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='wrench' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Service Type: </List.Header>
                <List.Description as='a'>{service.service_type}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mix' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Service Description:</List.Header>
                <List.Description as='a'> {service.service_description}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='location arrow' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>latitude and longitude:</List.Header>
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