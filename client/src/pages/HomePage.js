import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Container,
  Message,
  Image
} from 'semantic-ui-react'
function HomePage() {
  const navigate = useNavigate()
  return (
    <Container >
      <div style={{ marginTop: "12rem" }}></div>
      <Header as='h2' icon textAlign='center'>
        Welcome to Roadside assistance
      </Header>
      <Image src='home.png' size='medium' centered />
      <Message info>
        <Message.Header>
          <Icon name='info circle' />
          Please choose how you want to fix your car.
        </Message.Header>
        <p>
          Roadside Assistance is a web application that helps you to find the nearest roadside assistance service provider.
        </p>
      </Message>
      <Divider />

      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='id card' />
                Membership subscription
              </Header>

              <Button onClick={() => window.open("https://buy.stripe.com/test_14kbMp8y0dlTclacMM", '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')}  secondary>Continue with Membership subscription </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='credit card alternative' />
                Pay-on-demand
              </Header>
              <Button onClick={() => navigate("/request-service")} secondary icon labelPosition='right'>
                Next
                <Icon name='right arrow' />
              </Button>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </Segment>
    </Container>
  )
}

export default HomePage