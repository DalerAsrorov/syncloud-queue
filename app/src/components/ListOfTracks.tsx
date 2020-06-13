import { observer } from 'mobx-react';
import React from 'react';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { useStore } from '../store-context';
import { Player } from './Player';

export interface NoDataContainerProps {
  children: any;
  data: object | Array<any>;
  isListEmpty: boolean;
  isDataLoading: boolean;
}

const NoDataContainer: React.FC<NoDataContainerProps> = (props) => {
  let headerInfo: { title: string; description: string; icon: string } = {
    title: '',
    description: '',
    icon: '',
  };

  if (props.isDataLoading) {
    headerInfo.title = 'Loading tracks';
    headerInfo.description = 'This should take short amount of time';
    headerInfo.icon = 'search';
  } else if (props.isListEmpty) {
    headerInfo.title = 'No tracks to show';
    headerInfo.description = 'Searched tracks will appear here';
    headerInfo.icon = 'list layout';
  } else if (!!props.data) {
    return <>{props.children}</>;
  }

  return (
    <Container fluid as={Segment} basic textAlign="center">
      <Header color="grey" as="h2" icon>
        <Icon color="teal" name="list layout" />
        {headerInfo.title}
        <Header.Subheader>{headerInfo.description}</Header.Subheader>
      </Header>
    </Container>
  );
};

export interface ListOfTracksProps {
  clientId: string;
}

export const ListOfTracks: React.FC<ListOfTracksProps> = observer((props) => {
  const store = useStore();

  return (
    <NoDataContainer
      isListEmpty={store.isQueryTracklistEmpty}
      isDataLoading={store.isRequestingQueryTracks}
      data={store.queryTracklist}
    >
      {store.queryTracklist.map((track) => (
        <Player
          key={track.id}
          track={track}
          resolveUrl={track.permalink_url}
          clientId={props.clientId}
          onReady={() => console.log('track is loaded!')}
        />
      ))}
    </NoDataContainer>
  );
});
