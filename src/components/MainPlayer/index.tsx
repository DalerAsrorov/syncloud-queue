import { inject, observer } from 'mobx-react';
import React, { CSSProperties, useCallback } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { StoreKeys } from '../../stores/index';
import { MainPlayerStore } from '../../stores/main-player-store';
import { Track } from '../../typings/SC';
import PlayerView from './PlayerView';

export interface MainPlayerEnhancedViewProps extends MainPlayerIndexProps {
  mainPlayerStore?: MainPlayerStore;
}

const cssForHiddenPlaylists: CSSProperties = {
  visibility: 'hidden',
  height: '0px',
};

const MainPlayerEnhanced: React.FC<MainPlayerEnhancedViewProps> = inject(
  StoreKeys.MainPlayer
)(
  observer((props) => {
    const { mainPlayerStore, ...restProps } = props;

    const handleNext = useCallback(() => {
      mainPlayerStore!.nextClick();
    }, [mainPlayerStore]);
    const handlePrev = useCallback(() => {
      mainPlayerStore!.prevClick();
    }, [mainPlayerStore]);

    const setCurrentReady = (trackId: Track['id'], isReady: boolean) => {
      mainPlayerStore!.setCurrentTrackAsReady(trackId, isReady);
    };

    // if (!mainPlayerStore!.currentTrack?.track) {
    //   return (
    //     <Segment padded basic>
    //       No tracks
    //     </Segment>
    //   );
    // }

    const currentTrack = mainPlayerStore!.currentTrack;
    const tracks = mainPlayerStore!.tracklist;

    console.log('rerenders');

    return (
      <>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={
              track.id === currentTrack?.track.id ? {} : cssForHiddenPlaylists
            }
          >
            <PlayerView
              isReady={track.isReady}
              onReady={() => setCurrentReady(track.id, true)}
              onPrevClick={handlePrev}
              onNextClick={handleNext}
              resolveUrl={track.permalink_url}
              track={track}
              isCurrentTrack={track.id === currentTrack?.track.id}
              {...restProps}
            />
          </div>
        ))}
      </>
    );
  })
);

export interface MainPlayerIndexProps {
  clientId: string;
}

export default (props: MainPlayerIndexProps) => (
  <Container
    as={Segment}
    style={{
      width: '100%',
      position: 'fixed',
      padding: 0,
      bottom: 0,
      left: 0,
    }}
  >
    <Container as={Segment} style={{ padding: 0 }} basic>
      <MainPlayerEnhanced {...props} />
    </Container>
  </Container>
);
