import React, { useState, useEffect } from 'react'
import { Container, Form, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { incommingService } from '../actions/serviceRequestActions';

function ServiceRequestPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const incommingServiceRequest = useSelector(state => state.incommingServiceRequest);
    const { loading, error, success } = incommingServiceRequest;



    const INITIAL_STATE = {
        model: "",
        make: "",
        year: "",
        number_plate: "",
        service_type: "",
        service_description: "",
        service_requiredin_address: "",
    };


    const [service, setService] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        setService((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

   const submitHandler = (e) => {
       const { model, make, year, number_plate, service_type, service_description, service_requiredin_address } = service;
        e.preventDefault();
        dispatch(incommingService(model, make, year, number_plate, service_type, service_description, service_requiredin_address));
   }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo]);


    return (
        <Container>
            <div style={{ marginTop: 190 }} ></div>

           {error && <Message negative>
                <Message.Header>{error}</Message.Header>
            </Message>}

            {success && <Message positive>
                <Message.Header>Service Requested Successfully</Message.Header>
            </Message>}


            <Form loading={loading} onSubmit={submitHandler}>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Vehicle Model'
                        onChange={handleChange}
                        name='model'
                        value={service.model}
                        placeholder='Vehicle Model'
                    />
                    <Form.Input fluid label='Vehicle Make'
                        onChange={handleChange}
                        name='make'
                        value={service.make}
                        placeholder='Vehicle Make'
                    />
                    <Form.Input type='Number'
                        fluid label='Vehicle Year'
                        onChange={handleChange}
                        name='year'
                        value={service.year}
                        placeholder='Vehicle Year'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Vehicle Number Plate'
                        onChange={handleChange}
                        name='number_plate'
                        value={service.number_plate}
                        placeholder='Vehicle Number Plate'
                    />
                    <Form.Input fluid label='Service Type'
                        onChange={handleChange}
                        name='service_type'
                        value={service.service_type}
                        placeholder='eg: Oil Change, flat tyres, flat batteries, tire Rotation, towing, emergency fuel' />
                </Form.Group>

                <Form.TextArea label='Description'
                    onChange={handleChange}
                    name='service_description'
                    value={service.service_description}
                    placeholder='Tell us more about your vehicle problems' 
                />
                <Form.Input fluid label='Address'
                    onChange={handleChange}
                    name='service_requiredin_address'
                    value={service.service_requiredin_address}
                    placeholder='eg: 5 Mariner Street,glenfield,2167'
                />


                <Form.Button disabled={success||loading} primary>Submit</Form.Button>
            </Form>

        </Container>
    )
}

export default ServiceRequestPage