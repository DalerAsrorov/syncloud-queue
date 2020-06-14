import { observer } from 'mobx-react';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { useStore } from '../store-context';
import { Player } from './Player';
import { Track } from '../api/SC';

export interface NoDataContainerProps {
  children: any;
  data: object | Array<any>;
  isListEmpty: boolean;
  isDataLoading: boolean;
  nItems: number;
}

const NoDataContainer: React.FC<NoDataContainerProps> = (props) => {
  let headerInfo: {
    title: string;
    description: string;
    icon: SemanticICONS;
  } = {
    title: '',
    description: '',
    icon: 'list layout',
  };

  if (props.isDataLoading && props.isListEmpty) {
    headerInfo.title = 'Loading tracks';
    headerInfo.description = 'This should take short amount of time';
    headerInfo.icon = 'search';
  } else if (props.isListEmpty) {
    headerInfo.title = 'No tracks to show';
    headerInfo.description = 'Searched tracks will appear here';
  } else if (!!props.data) {
    return <>{props.children}</>;
  }

  return (
    <Container fluid as={Segment} basic textAlign="center">
      <Header color="grey" as="h2" icon>
        <Icon color="teal" name={headerInfo.icon} />
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

  const handleFetchMore = () => {
    store.fetchSearchedTracks(
      {
        limit: store.limit,
        linked_partitioning: 1,
      },
      true
    );
  };

  return (
    <NoDataContainer
      isListEmpty={store.isQueryTracklistEmpty}
      isDataLoading={store.isRequestingQueryTracks}
      data={store.queryTracklistMap}
      nItems={store.queryTracklistNTotal}
    >
      {store.filteredSearchList.map((track) => (
        <Player
          onAddClick={() => store.addTrackToQueue(track)}
          key={track.id}
          track={track}
          resolveUrl={track.permalink_url}
          clientId={props.clientId}
          // onReady={() => console.log('track is loaded!')}
        />
      ))}
      <Waypoint onEnter={handleFetchMore}></Waypoint>
    </NoDataContainer>
  );
});
