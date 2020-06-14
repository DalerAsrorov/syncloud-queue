import { observer } from 'mobx-react';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { useStore } from '../../store-context';
import { PlayerView } from './PlayerView';

export interface MainPlayerProps {
  clientId: string;
}

const MainPlayerView: React.FC<MainPlayerProps> = observer(
  (props: MainPlayerProps) => {
    const store = useStore();

    if (store.currentTrackId === null) {
      return <Segment>No tracks</Segment>;
    }

    const currentTrack = store.myTracklistMap[store.currentTrackId];

    return (
      <PlayerView
        resolveUrl={currentTrack.permalink_url}
        track={currentTrack}
        {...props}
      />
    );
  }
);

export default (props: MainPlayerProps) => (
  <Segment
    basic
    style={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    }}
  >
    <Container>
      <MainPlayerView {...props} />
    </Container>
  </Segment>
);
