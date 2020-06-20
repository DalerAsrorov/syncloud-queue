import { observer } from 'mobx-react';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { IMyTracklistStore } from '../../stores/tracklist-store';
import { CurrentTrack } from '../../typings/utils';
import { PlayerView } from './PlayerView';
import { EnhancedTrack } from '../../typings/SC';

export interface MainPlayerIndexProps {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onStopTrack: () => void;
  onTrackReady: (id: EnhancedTrack['id']) => void;
  clientId: string;
  currentTrackId: CurrentTrack['track']['id'] | null;
  tracks: IMyTracklistStore['tracklist'];
}

export const MainPlayer = observer((props: MainPlayerIndexProps) => {
  let content = (
    <Segment padded basic textAlign="center">
      Waiting for you to add tracks...
    </Segment>
  );

  if (props.tracks.length !== 0) {
    content = (
      <>
        {props.tracks.map((track) =>
          track.id === props.currentTrackId ? (
            <PlayerView
              key={track.id}
              onReady={() => props.onTrackReady(track.id)}
              resolveUrl={track.permalink_url}
              track={track}
              {...props}
            />
          ) : null
        )}
      </>
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
});
