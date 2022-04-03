import React from 'react';
import { Grid, GridColumn, } from 'semantic-ui-react';

function ProfilePage() {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <GridColumn style={{ maxWidth: 450 }}>
        <h1>Profile Page</h1>
      </GridColumn>
      
  </Grid>
  )
}

export default ProfilePage