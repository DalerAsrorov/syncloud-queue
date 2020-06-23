import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { RootState } from '../../reducers/index';
import {
  MapMainPlayerProps,
  MappedMainPlayerDispatch,
} from '../../reducers/main-player';
import { PlayerView } from './PlayerView';

export interface MainPlayerViewProps
  extends RootState,
    MappedMainPlayerDispatch,
    MapMainPlayerProps {}

export const MainPlayer: React.FC<MainPlayerViewProps> = (props) => {
  const { clientId, currentTrack, currentTrackIndex } = props;

  if (!props.currentTrack?.track) {
    return (
      <Segment padded basic>
        No tracks
      </Segment>
    );
  }

  const handlePrev = () => {
    // TODO: prev clic kand next click should be thunks
    props.onPrevTrackClick(currentTrackIndex);
  };
  const handleNext = () => {
    props.onNextTrackClick(currentTrackIndex);
  };
  const tracks = props;

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
        <PlayerView
          clientId={clientId!}
          onPlayClick={() => {
            console.log('play button clicked!');
          }}
          onPrevClick={handlePrev}
          onNextClick={handleNext}
          resolveUrl={currentTrack.track.permalink_url}
          playlist={{ tracks: props.mainPlayer.tracklist }}
          track={currentTrack}
          {...props}
        />
      </Container>
    </Container>
  );
};
