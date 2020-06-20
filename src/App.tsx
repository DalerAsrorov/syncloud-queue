import { inject, observer } from 'mobx-react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Grid, Ref, Responsive, Sticky } from 'semantic-ui-react';
import { ListOfTracks } from './components/ListOfTracks';
import { MainPlayer } from './components/MainPlayer';
import { MyTrackList } from './components/MyTracklist';
import { Nav } from './components/Nav';
import { AppResponsive, AppResponsiveState } from './components/Responsive';
import { Search } from './components/Search';
import { StoreKeys } from './stores/index';
import { MainPlayerStore } from './stores/main-player-store';
import { MyTracklistStore } from './stores/tracklist-store';
import { Track } from './typings/SC';

export interface AppProps {
  clientId: string;
  myTracklistStore?: MyTracklistStore;
  mainPlayerStore?: MainPlayerStore;
}

export interface AppState {
  searchHeight: number;
}

const SEARCH_DEFAULT_OFFSET_HEIGHT = 80;

export const App: React.FC<AppProps> = inject(
  StoreKeys.MyTracklistStore,
  StoreKeys.MainPlayer
)(
  observer(({ clientId, myTracklistStore, mainPlayerStore }) => {
    const [state, setState] = useState<AppState>({
      searchHeight: SEARCH_DEFAULT_OFFSET_HEIGHT,
    });
    const containerContextRef = createRef();
    const tracklistContextRef = createRef();
    const searchRef = useRef<HTMLDivElement>(null);

    const handleDeleteTrack = React.useCallback(
      (trackId: Track['id']) => {
        myTracklistStore!.deleteTrackFromQueue(trackId);
      },
      [myTracklistStore]
    );
    const handleAddTrack = React.useCallback(
      (track: Track) => {
        myTracklistStore!.addTrackToQueue(track);

        if (myTracklistStore!.numberOfTracks === 1) {
          mainPlayerStore!.setCurrentTrack(track.id);
        }
      },
      [myTracklistStore, mainPlayerStore]
    );
    const handleTrackIsReady = React.useCallback(
      (trackId: Track['id']) => {
        myTracklistStore!.setTrackIsReady(trackId, true);
      },
      [myTracklistStore]
    );
    const handlePrev = React.useCallback(() => {
      mainPlayerStore!.prevClick();
    }, [mainPlayerStore]);
    const handleNext = React.useCallback(() => {
      mainPlayerStore!.nextClick();
    }, [mainPlayerStore]);

    const handleStop = () => {
      console.log('onStop is called here');
    };

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
            props &&
            props.width <= (Responsive.onlyComputer.minWidth as number);

          return (
            <>
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
                      {!shouldShowMobileView && (
                        <Grid.Column width={5}>
                          <Sticky
                            context={tracklistContextRef}
                            offset={state.searchHeight}
                          >
                            <MyTrackList
                              onDeleteTrack={handleDeleteTrack}
                              tracklist={myTracklistStore!.tracklist}
                              numberOfTracks={myTracklistStore!.numberOfTracks}
                            />
                          </Sticky>
                        </Grid.Column>
                      )}
                      <Grid.Column
                        width={shouldShowMobileView ? 'sixteen' : 'eleven'}
                        style={{ marginBottom: '3.5rem' }}
                      >
                        <ListOfTracks
                          onAddTrack={handleAddTrack}
                          clientId={clientId}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Ref>
                </Grid>
              </Ref>
              <MainPlayer
                tracks={myTracklistStore!.tracklist}
                currentTrackId={mainPlayerStore!.currentTrackId}
                clientId={clientId}
                onPrevClick={handlePrev}
                onNextClick={handleNext}
                onStopTrack={handleStop}
                onTrackReady={handleTrackIsReady}
                onPlayClick={() => {
                  console.log('on clicked play');
                }}
              />
            </>
          );
        }}
      </AppResponsive>
    );
  })
);
