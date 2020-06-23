import React from 'react';
import { Waypoint } from 'react-waypoint';
import { RootState } from '../reducers/index';
import {
  MappedSearchPlayerDispatch,
  MappedSearchPlayerProps,
  searchPlayer,
} from '../reducers/search-players';
import { Track } from '../typings/SC';
import { NoDataContainer } from './NoDataContainer';
import SearchPlayer from './SearchPlayer';

export interface ListOfTracksProps
  extends RootState,
    MappedSearchPlayerProps,
    MappedSearchPlayerDispatch {
  clientId: string;
}

export const ListOfTracks: React.FC<ListOfTracksProps> = (props) => {
  const handleFetchMore = () => {
    props.onFetch(
      {
        limit: props.searchPlayer.limit,
        linked_partitioning: 1,
      },
      true
    );
  };
  const addTrack = (track: Track) => {
    props.onAddTrack(track);
  };

  return (
    <NoDataContainer
      nEmptyItems={10}
      isListEmpty={props.isEmpty}
      isDataLoading={props.searchPlayer.isLoading}
      data={props.searchPlayer.tracks}
      nItems={props.numberOfTracks}
    >
      {props.filteredList.map((track) => (
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
};
