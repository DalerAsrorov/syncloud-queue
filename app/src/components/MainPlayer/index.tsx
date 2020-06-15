import { observer } from 'mobx-react';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { useStore } from '../../store-context';
import { PlayerView } from './PlayerView';

export interface MainPlayerEnhancedViewProps extends MainPlayerIndexProps {}

const MainPlayerEnhanced: React.FC<MainPlayerEnhancedViewProps> = observer(
  (props) => {
    const store = useStore();

    if (!store.currentTrack) {
      return <Segment>No tracks</Segment>;
    }

    const currentTrack = store.currentTrack.track;

    return (
      <PlayerView
        onPrevClick={() => store.prevClick()}
        onNextClick={() => store.nextClick()}
        onPlayClick={() => {
          console.log('play button clicked!');
        }}
        resolveUrl={currentTrack.permalink_url}
        playlist={{ tracks: store.myTracklst }}
        track={currentTrack}
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
