import { inject, observer } from 'mobx-react';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { StoreKeys } from '../stores/index';
import { MainPlayerStore } from '../stores/main-player-store';
import { QueryStore } from '../stores/query-store';
import { Track } from '../typings/SC';
import { NoDataContainer } from './NoDataContainer';
import SearchPlayer from './SearchPlayer';

export interface ListOfTracksProps {
  clientId: string;
  queryStore?: QueryStore;
  mainPlayerStore?: MainPlayerStore;
}

export const ListOfTracks: React.FC<ListOfTracksProps> = inject(
  StoreKeys.QueryStore,
  StoreKeys.MainPlayer
)(
  observer((props) => {
    const { queryStore, mainPlayerStore } = props;

    const handleFetchMore = () => {
      queryStore!.fetchSearchedTracks(
        {
          limit: queryStore!.limit,
          linked_partitioning: 1,
        },
        true
      );
    };
    const addTrack = (track: Track) => {
      mainPlayerStore!.addTrackToQueue(track);
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
            onAddClick={() => addTrack(track)}
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
