import { inject, observer } from 'mobx-react';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import {
  Container,
  Header,
  Icon,
  Placeholder,
  Segment,
} from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { StoreKeys } from '../stores/index';
import { QueryStore } from '../stores/query-store';
import SearchPlayer from './SearchPlayer';
import { Track } from '../typings/SC';

export interface NoDataContainerProps {
  children: any;
  nEmptyItems: number;
  data: object | Array<any>;
  isListEmpty: boolean;
  isDataLoading: boolean;
  nItems: number;
}

const ListPlaceHolder = () => (
  <Segment raised padded="very">
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line length="long" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="short" />
      </Placeholder.Paragraph>
    </Placeholder>
  </Segment>
);

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

    return (
      <>
        {[...new Array(props.nEmptyItems)].map((_item, index) => (
          <ListPlaceHolder key={index} />
        ))}
      </>
    );
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
  onAddTrack: (track: Track) => void;
  clientId: string;
  queryStore?: QueryStore;
}

export const ListOfTracks: React.FC<ListOfTracksProps> = inject(
  StoreKeys.QueryStore
)(
  observer((props) => {
    const { queryStore } = props;

    const handleFetchMore = () => {
      queryStore!.fetchSearchedTracks(
        {
          limit: queryStore!.limit,
          linked_partitioning: 1,
        },
        true
      );
    };

    return (
      <NoDataContainer
        nEmptyItems={10}
        isListEmpty={queryStore!.isTracklistEmpty}
        isDataLoading={queryStore!.isLoading}
        data={queryStore!.tracklist}
        nItems={queryStore!.numberOfTracks}
      >
        {queryStore!.filteredSearchList.map((track) => (
          <SearchPlayer
            onAddClick={() => props.onAddTrack(track)}
            key={track.id}
            track={track}
            resolveUrl={track.permalink_url}
            clientId={props.clientId}
          />
        ))}
        <Waypoint onEnter={handleFetchMore}></Waypoint>
      </NoDataContainer>
    );
  })
);
