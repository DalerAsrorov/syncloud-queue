import React, { createRef, useEffect, useRef, useState } from 'react';
import { Grid, Ref, Responsive, Sticky, Segment } from 'semantic-ui-react';
import { Nav } from './components/Nav';
import { AppResponsive, AppResponsiveState } from './components/Responsive';
import { ConnectedListOfTracks } from './containers/ListOfTracks';
import { ConnectedMainPlayer } from './containers/MainPlayer';
import { ConnectedMyTracklist } from './containers/MyTracklist';
import { ConnectedSearch } from './containers/Search';
import { Environments } from './typings/environments';

export interface AppProps {
  clientId: string;
  env?: Environments;
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
    <AppResponsive>
      {(props: AppResponsiveState) => {
        const shouldShowMobileView =
          props && props.width <= (Responsive.onlyComputer.minWidth as number);

        return (
          <Segment basic>
            <Nav />
            <Ref innerRef={containerContextRef}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="16">
                    <Sticky context={containerContextRef}>
                      <div ref={searchRef}>
                        <ConnectedSearch />
                      </div>
                    </Sticky>
                  </Grid.Column>
                </Grid.Row>
                <Ref innerRef={tracklistContextRef}>
                  <Grid.Row divided>
                    {!shouldShowMobileView && (
                      <Grid.Column width={5}>
                        <Sticky
                          context={tracklistContextRef}
                          offset={state.searchHeight}
                        >
                          <ConnectedMyTracklist />
                        </Sticky>
                      </Grid.Column>
                    )}
                    <Grid.Column
                      width={shouldShowMobileView ? 'sixteen' : 'eleven'}
                      style={{ marginBottom: '3.5rem' }}
                    >
                      <ConnectedListOfTracks clientId={clientId} />
                    </Grid.Column>
                  </Grid.Row>
                </Ref>
              </Grid>
            </Ref>
            <ConnectedMainPlayer clientId={clientId} />
          </Segment>
        );
      }}
    </AppResponsive>
  );
};
