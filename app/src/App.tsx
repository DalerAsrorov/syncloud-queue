import React from "react";
import { Container, Grid, Image, Segment, Input } from "semantic-ui-react";
import appLogo from "./images/syncloud.png";
import githubLogo from "./images/github.png";

export const App = () => (
  <Container fluid as={Segment}>
    <Grid as={Segment} style={{ marginTop: 0 }}>
      <Grid.Column floated="left" width={5}>
        <Image
          src={appLogo}
          style={{ width: "4rem" }}
          size="mini"
          floated="left"
        />
      </Grid.Column>
      <Grid.Column floated="right" width={5}>
        <Image
          href="https://github.com/DalerAsrorov/syncloud-queue"
          target="__blank"
          style={{ width: "3rem" }}
          src={githubLogo}
          size="mini"
          floated="right"
        />
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <Input size="huge" fluid icon="search" placeholder="Search..." />
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
