import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { StoreKeys } from '../../stores/index';
import { MainPlayerStore } from '../../stores/main-player-store';
import { PlayerView } from './PlayerView';

export interface MainPlayerProps {
  clientId: string;
  mainPlayerStore?: MainPlayerStore;
}

export const MainPlayer: React.FC<MainPlayerProps> = inject(
  StoreKeys.MainPlayer
)(
  observer((props) => {
    const { mainPlayerStore, ...restProps } = props;
    let content = (
      <Segment padded basic>
        No tracks
      </Segment>
    );

    if (!!mainPlayerStore!.currentTrack) {
      const currentTrack = mainPlayerStore!.currentTrack;
      const tracks = mainPlayerStore!.tracklist;
      const handlePrev = () => {
        mainPlayerStore!.prevClick();
      };
      const handleNext = () => {
        mainPlayerStore!.nextClick();
      };

      content = (
        <PlayerView
          onPrevClick={handlePrev}
          onNextClick={handleNext}
          onPlayClick={() => {
            console.log('play button clicked!');
          }}
          resolveUrl={currentTrack.track.permalink_url}
          playlist={{ tracks: toJS(tracks) }}
          track={currentTrack.track}
          currentTrack={currentTrack}
          {...restProps}
        />
      );
    }

    return (
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
          {content}
        </Container>
      </Container>
    );
  })
);
