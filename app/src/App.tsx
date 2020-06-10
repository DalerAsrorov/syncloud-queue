import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { Nav } from './components/Nav';
import { Search } from './components/Search';

export const App = () => (
  <Container fluid as={Segment} basic>
    <Nav />
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <Search />
        </Grid.Column>
      </Grid.Row>
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
