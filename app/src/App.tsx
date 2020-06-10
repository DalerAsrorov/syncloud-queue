import React from 'react';
// import logo from './logo.svg';
import {Container, Grid, Segment} from 'semantic-ui-react';

export const App = () => {
  return (
    <Container fluid content as={Segment}>
      <Segment>navigation bar</Segment>
      <Grid>
        <Grid.Row divided>
          <Grid.Column width={6}>
            <Segment>Left side container for player</Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>Right side container for search and playlists</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
