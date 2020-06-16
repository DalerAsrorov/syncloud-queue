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
      return (
        <Segment padded basic>
          No tracks
        </Segment>
      );
    }

    const currentTrack = store.currentTrack;
    const tracks = store.myTracklst;

    return (
      <PlayerView
        onPrevClick={() => store.prevClick()}
        onNextClick={() => store.nextClick()}
        onPlayClick={() => {
          console.log('play button clicked!');
        }}
        resolveUrl={currentTrack.track.permalink_url}
        playlist={{ tracks }}
        track={currentTrack.track}
        currentTrack={currentTrack}
        {...props}
      />
    );
  }
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
