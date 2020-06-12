import { observer } from 'mobx-react';
import React from 'react';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { useStore } from '../store-context';
import { Player } from './Player';

export interface ListOfTracksProps {
  clientId: string;
}

export const ListOfTracks: React.FC<ListOfTracksProps> = observer((props) => {
  const store = useStore();

  if (store.isQueryTracklistEmpty) {
    return (
      <Container fluid as={Segment} basic textAlign="center">
        <Header color="grey" as="h2" icon>
          <Icon color="teal" name="list layout" />
          No tracks to show
          <Header.Subheader>Searched tracks will appear here.</Header.Subheader>
        </Header>
      </Container>
    );
  }

  return (
    <Segment>
      {store.queryTracklist.map((track) => (
        <Player
          track={track}
          cleintId={props.clientId}
          onReady={() => console.log('track is loaded!')}
        />
      ))}
    </Segment>
  );
});
