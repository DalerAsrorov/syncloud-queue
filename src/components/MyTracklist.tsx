import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button, Header, Image, Label, List } from 'semantic-ui-react';
import { StoreKeys } from '../stores/index';
import { MainPlayerStore } from '../stores/main-player-store';
import { Track } from '../typings/SC';

export interface MyTracklistProps {
  mainPlayerStore?: MainPlayerStore;
}

export const MyTrackList: React.FC<MyTracklistProps> = inject(
  StoreKeys.MainPlayer
)(
  observer((props) => {
    const { mainPlayerStore } = props;

    const deleteTrack = (trackId: Track['id']) => {
      mainPlayerStore!.deleteTrackFromQueue(trackId);
    };

    return (
      <>
        <Header color="grey" size="small">
          Queue: {mainPlayerStore!.numberOfTracks} tracks
        </Header>
        <List
          style={{ overflowY: 'auto', minHeight: '60vh', maxHeight: '70vh' }}
          verticalAlign="middle"
          divided
          relaxed="very"
          size="large"
        >
          {mainPlayerStore!.tracklist.map((track: Track) => {
            const isCurrentTrack = track.id === mainPlayerStore!.currentTrackId;

            return (
              <List.Item
                key={track.id}
                active={track.id === mainPlayerStore!.currentTrackId}
              >
                {isCurrentTrack && (
                  <Label
                    key={`${mainPlayerStore!.currentTrackId}`}
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
                  <Button
                    color="violet"
                    basic
                    circular
                    icon="arrows alternate"
                  />
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </>
    );
  })
);
