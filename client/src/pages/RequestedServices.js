import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Loader, Menu, Icon, Tab, Table, Image, Header, Button, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { userRequestedServiceLists } from '../actions/serviceRequestActions';

function RequestedServices() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRequestedServiceList = useSelector(state => state.userRequestedServiceList);
    const { loading, success, allServices } = userRequestedServiceList;




    React.useEffect(() => {

        dispatch(userRequestedServiceLists());


    }, [dispatch]);




    return (
        <>
            <div style={{ marginTop: 190 }} ></div>

            {loading && <Loader active inline='centered' />}

            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer Name</Table.HeaderCell>
                        <Table.HeaderCell>Customer Phone</Table.HeaderCell>
                        <Table.HeaderCell>Customer Address</Table.HeaderCell>
                        <Table.HeaderCell>Car Details</Table.HeaderCell>
                        <Table.HeaderCell>Service Required In</Table.HeaderCell>
                        <Table.HeaderCell>Service Type</Table.HeaderCell>
                        <Table.HeaderCell>Service Description</Table.HeaderCell>
                        <Table.HeaderCell>Requested on</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                {allServices?.map((service) => (
                    <Table.Body key={service._id}>
                        <Table.Row  >
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={service.user?.avatar ? service.user.avatar : "/noimage.jpg"} rounded size='mini' />
                                    <Header.Content>
                                        {`${service.user?.title} ${service.user?.first_name} ${service.user?.last_name}`}
                                        <Header.Subheader>{service.user?.email}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>

                            <Table.Cell>{service.user?.mobile_number}</Table.Cell>
                            <Table.Cell>{service.user?.address}</Table.Cell>
                            <Table.Cell>{service.model} {service.make} {service.year} {service.number_plate}</Table.Cell>
                            <Table.Cell>{service.service_requiredin_address}</Table.Cell>
                            <Table.Cell>{service.service_type}</Table.Cell>
                            <Table.Cell>{service.service_description}</Table.Cell>
                            <Table.Cell>{new Date(service.createdAt).toString().slice(0, 16)}</Table.Cell>
                            <Table.Cell>{service.price == 0 ? <Icon name='window minimize' /> : `$${service.price}`}</Table.Cell>
                            <Table.Cell>
                                <Label ribbon color={service.status == 'Pending' ? 'yellow' : service.status == 'Accepted' ? 'green' : 'red'}>{service.status}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                {service.status == 'Pending' ?
                                    <Button color='green' onClick={() => navigate(`/service-request/${service._id}`)}>Approve</Button>
                                    // edit
                                  
                                    :
                                    null}


                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}


            </Table>
            <Table  >
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>

        </>

    )
}

export default RequestedServices