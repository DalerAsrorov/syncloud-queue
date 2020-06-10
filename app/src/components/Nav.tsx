import React from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import githubLogo from "../images/github.png";
import appLogo from "../images/syncloud.png";

export const Nav = () => (
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
);
