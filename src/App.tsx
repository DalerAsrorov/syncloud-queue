import React, { createRef, useEffect, useRef, useState } from 'react';
import { Container, Grid, Ref, Segment, Sticky } from 'semantic-ui-react';
import { ListOfTracks } from './components/ListOfTracks';
import MainPlayer from './components/MainPlayer';
import { MyTrackList } from './components/MyTracklist';
import { Nav } from './components/Nav';
import { Search } from './components/Search';

export interface AppProps {
  clientId: string;
}

export interface AppState {
  searchHeight: number;
}

const SEARCH_DEFAULT_OFFSET_HEIGHT = 80;

export const App: React.FC<AppProps> = ({ clientId }) => {
  const [state, setState] = useState<AppState>({
    searchHeight: SEARCH_DEFAULT_OFFSET_HEIGHT,
  });
  const containerContextRef = createRef();
  const tracklistContextRef = createRef();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState({
      searchHeight: searchRef.current
        ? searchRef.current.clientHeight + 20
        : state.searchHeight,
    });
  }, [state.searchHeight]);

  return (
    <>
      <Container as={Segment} basic>
        <Nav />
        <Ref innerRef={containerContextRef}>
          <Grid>
            <Grid.Row>
              <Grid.Column width="16">
                <Sticky context={containerContextRef}>
                  <div ref={searchRef}>
                    <Search />
                  </div>
                </Sticky>
              </Grid.Column>
            </Grid.Row>
            <Ref innerRef={tracklistContextRef}>
              <Grid.Row divided>
                <Grid.Column width={5}>
                  <Sticky
                    context={tracklistContextRef}
                    offset={state.searchHeight}
                  >
                    <MyTrackList />
                  </Sticky>
                </Grid.Column>
                <Grid.Column width={11} style={{ marginBottom: '3.5rem' }}>
                  <ListOfTracks clientId={clientId} />
                </Grid.Column>
              </Grid.Row>
            </Ref>
          </Grid>
        </Ref>
      </Container>
      <MainPlayer clientId={clientId} />
    </>
  );
};
