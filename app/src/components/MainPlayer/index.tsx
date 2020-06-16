import { observer } from 'mobx-react';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { useStore } from '../../store-context';
import { PlayerView } from './PlayerView';

export interface MainPlayerEnhancedViewProps extends MainPlayerIndexProps {}

const MainPlayerEnhanced: React.FC<MainPlayerEnhancedViewProps> = observer(
  (props) => {
    const store = useStore();

    if (!store.currentTrack?.track) {
      return <Segment>No tracks</Segment>;
    }

    const trackInfo = store.currentTrack;

    return (
      <PlayerView
        onPrevClick={() => store.prevClick()}
        onNextClick={() => store.nextClick()}
        onPlayClick={() => {
          console.log('play button clicked!');
        }}
        resolveUrl={trackInfo.track.permalink_url}
        playlist={{ tracks: store.myTracklst }}
        currentTrackIndex={trackInfo.index}
        track={trackInfo.track}
        {...props}
      />
    );
  }
);

export interface MainPlayerIndexProps {
  clientId: string;
}

export default (props: MainPlayerIndexProps) => (
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
      <MainPlayerEnhanced {...props} />
    </Container>
  </Segment>
);
