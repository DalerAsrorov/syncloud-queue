import React, { createRef } from 'react';
import { Container, Grid, Ref, Segment, Sticky } from 'semantic-ui-react';
import { ListOfTracks } from './components/ListOfTracks';
import { MyTrackList } from './components/MyTracklist';
import { Nav } from './components/Nav';
import { Search } from './components/Search';

interface AppProps {
  clientId: string;
}

export const App: React.FC<AppProps> = ({ clientId }) => {
  const contextRef = createRef();

  return (
    <Container as={Segment} basic>
      <Nav />
      <Ref innerRef={contextRef}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              <Sticky context={contextRef}>
                <Search />
              </Sticky>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row divided>
            <Grid.Column width={5}>
              <MyTrackList />
            </Grid.Column>
            <Grid.Column width={11}>
              <ListOfTracks clientId={clientId} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Ref>
    </Container>
  );
};
