import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { StoreKeys } from '../../stores/index';
import { MainPlayerStore } from '../../stores/main-player-store';
import { PlayerView } from './PlayerView';

export interface MainPlayerEnhancedViewProps extends MainPlayerIndexProps {
  mainPlayerStore?: MainPlayerStore;
}

const HIDDEN_STYLE: CSSProperties = {
  visibility: 'hidden',
  height: '0px',
  width: '0px',
};

const MainPlayerEnhanced: React.FC<MainPlayerEnhancedViewProps> = inject(
  StoreKeys.MainPlayer
)(
  observer((props) => {
    const { mainPlayerStore, ...restProps } = props;

    if (!mainPlayerStore!.currentTrack?.track) {
      return (
        <Segment padded basic>
          No tracks
        </Segment>
      );
    }

    const handlePrev = () => {
      mainPlayerStore!.prevClick();
    };
    const handleNext = () => {
      mainPlayerStore!.nextClick();
    };
    const currentTrack = mainPlayerStore!.currentTrack;
    const myTracklist = mainPlayerStore!.tracklist;

    return (
      <>
        {myTracklist.map((track) => (
          <div
            key={track.id}
            style={track.id === currentTrack.track.id ? {} : HIDDEN_STYLE}
          >
            <PlayerView
              key={track.id}
              onPrevClick={handlePrev}
              onNextClick={handleNext}
              onPlayClick={() => {
                console.log('play button clicked!');
              }}
              onReady={() => {
                mainPlayerStore!.setTrackReady(track.id, true);
              }}
              isReady={track.isReady}
              resolveUrl={track.permalink_url}
              playlist={{ tracks: myTracklist }}
              track={track}
              currentTrackInfo={currentTrack}
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
