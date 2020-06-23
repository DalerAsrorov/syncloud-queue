import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { RootState } from '../../reducers/index';
import {
  MapMainPlayerProps,
  MappedMainPlayerDispatch,
} from '../../reducers/main-player';
import { PlayerView } from './PlayerView';
import { EnhancedTrack } from '../../typings/SC';

export interface MainPlayerViewProps
  extends RootState,
    MappedMainPlayerDispatch,
    MapMainPlayerProps {}

export const MainPlayer: React.FC<MainPlayerViewProps> = (props) => {
  if (!props.currentTrack) {
    return (
      <Segment padded basic>
        No tracks
      </Segment>
    );
  }

  const handlePrev = () => {
    props.onPrevTrackClick(props.currentTrackIndex);
  };
  const handleNext = () => {
    props.onNextTrackClick(props.currentTrackIndex);
  };
  const setTrackAsReady = (trackId: EnhancedTrack['id'], isReady: boolean) => {
    props.onSetTrackReady(trackId, isReady);
  };

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
        {props.mainPlayer.tracklist.map((track: EnhancedTrack) => (
          <PlayerView
            key={track.id}
            clientId={props.clientId!}
            isReady={track.isReady}
            onReady={() => setTrackAsReady(track.id, true)}
            isCurrentTrack={track.id === props.mainPlayer.currentTrackId}
            onPrevClick={handlePrev}
            onNextClick={handleNext}
            resolveUrl={track.permalink_url}
            playlist={{ tracks: props.mainPlayer.tracklist }}
            track={track}
            {...props}
          />
        ))}
      </Container>
    </Container>
  );
};
