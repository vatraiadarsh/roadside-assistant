import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {Link} from "react-router-dom";

const Register = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center'>
        <Image src='/logo.png' /> Register a new account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='blue' fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
       Already have an account? &nbsp;<Link to={"/login"} >Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

export default Register