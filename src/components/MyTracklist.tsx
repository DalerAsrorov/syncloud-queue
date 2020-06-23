import React from 'react';
import { Button, Header, Image, Label, List } from 'semantic-ui-react';
import { RootState } from '../reducers/index';
import {
  MapMainPlayerProps,
  MappedMainPlayerDispatch,
} from '../reducers/main-player';
import { Track } from '../typings/SC';

export interface MyTracklistProps
  extends RootState,
    MappedMainPlayerDispatch,
    MapMainPlayerProps {}

export const MyTracklist: React.FC<MyTracklistProps> = (props) => {
  const deleteTrack = (trackId: Track['id']) => {
    props.onDeleteTrack(trackId);
  };

  return (
    <>
      <Header color="grey" size="small">
        Queue: {props.numberOfTracks} tracks
      </Header>
      <List
        style={{ overflowY: 'auto', minHeight: '60vh', maxHeight: '70vh' }}
        verticalAlign="middle"
        divided
        relaxed="very"
        size="large"
      >
        {props.mainPlayer.tracklist.map((track: Track) => {
          const isCurrentTrack = track.id === props.mainPlayer.currentTrackId;

          return (
            <List.Item
              key={track.id}
              active={track.id === props.mainPlayer.currentTrackId}
            >
              {isCurrentTrack && (
                <Label
                  key={`${track.id}`}
                  empty
                  circular
                  color="teal"
                  // TODO: maybe animate the styling below
                  style={{ marginRight: '0.5rem' }}
                />
              )}
              <Image avatar src={track.artwork_url} />
              <List.Content>
                <List.Header>{track.title}</List.Header>
                <List.Description>{track.user.username}</List.Description>
              </List.Content>
              <List.Content floated="right">
                <Button
                  onClick={() => deleteTrack(track.id)}
                  basic
                  negative
                  circular
                  icon="trash"
                />
                <Button color="violet" basic circular icon="arrows alternate" />
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};
