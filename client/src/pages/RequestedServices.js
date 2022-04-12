import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Loader, Menu, Icon, Tab, Table, Image, Header, Button } from 'semantic-ui-react';
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

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer Name</Table.HeaderCell>
                        <Table.HeaderCell>Customer Phone</Table.HeaderCell>
                        <Table.HeaderCell>Customer Address</Table.HeaderCell>
                        <Table.HeaderCell>Car Details</Table.HeaderCell>
                        <Table.HeaderCell>Service Required In</Table.HeaderCell>
                        <Table.HeaderCell>Service Type</Table.HeaderCell>
                        <Table.HeaderCell>Service Description</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                {allServices?.map((service) => (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={service.user.avatar ? service.user.avatar : "/noimage.jpg"} rounded size='mini' />
                                    <Header.Content>
                                        {`${service.user.title} ${service.user.first_name} ${service.user.last_name}`}
                                        <Header.Subheader>{service.user.email}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>

                            <Table.Cell>{service.user.mobile_number}</Table.Cell>
                            <Table.Cell>{service.user.address}</Table.Cell>
                            <Table.Cell>{service.model} {service.make} {service.year} {service.number_plate}</Table.Cell>
                            <Table.Cell>{service.service_requiredin_address}</Table.Cell>
                            <Table.Cell>{service.service_type}</Table.Cell>
                            <Table.Cell>{service.service_description}</Table.Cell>
                            <Table.Cell>
                                <Button color='green'>Accept</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}



            </Table>
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
        </>

    )
}

export default RequestedServices