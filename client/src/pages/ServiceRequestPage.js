import React, { useState, useEffect } from 'react'
import { Container, Form, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ServiceRequestPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const INITIAL_STATE = {
        user: userInfo?._id,
        model: "",
        make: "",
        year: "",
        number_plate: "",
        service_type: "",
        service_description: "",
        service_status: "",
        service_requiredin_address: "",
    };


    const [service, setService] = useState(INITIAL_STATE);
    const [message, setMessage] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!userInfo) {
           navigate('/login');
        }    
    }, [userInfo]);

  
    return (
        <Container>
            <div style={{ marginTop: 190  }} ></div>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Vehicle Model' placeholder='model' />
                    <Form.Input fluid label='Vehicle Make' placeholder='make' />
                    <Form.Input type='Number' fluid label='Vehicle Year' placeholder='year' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Vehicle Number Plate' placeholder='Number plate' />
                    <Form.Input fluid label='Service Type' placeholder='eg: Oil Change, flat tyres, flat batteries, tire Rotation, towing, emergency fuel' />
                </Form.Group>

                <Form.TextArea label='Description' placeholder='Tell us more about your vehicle problems' />
                <Form.Input fluid label='Address' placeholder='defected vehicle address' />

                <Form.Button primary>Submit</Form.Button>
            </Form>

        </Container>
    )
}

export default ServiceRequestPage