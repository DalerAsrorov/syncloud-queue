import { observer } from 'mobx-react';
import React from 'react';
import { Button, Header, Image, Label, List } from 'semantic-ui-react';
import { useStore } from '../store-context';
import { Track } from '../typings/SC';

export interface MyTracklistProps {}

export const MyTrackList: React.FC<MyTracklistProps> = observer(() => {
  const store = useStore();

  return (
    <>
      <Header color="grey" size="small">
        Queue: {store.myTracklistNTotal} tracks
      </Header>
      <List
        style={{ overflowY: 'auto', minHeight: '60vh', maxHeight: '70vh' }}
        verticalAlign="middle"
        divided
        relaxed="very"
        size="large"
      >
        {store.myTracklst.map((track: Track) => {
          const isCurrentTrack = track.id === store.currentTrackId;

          return (
            <List.Item
              key={track.id}
              active={track.id === store.currentTrackId}
            >
              {isCurrentTrack && (
                <Label
                  key={`${store.currentTrackId}`}
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
                  onClick={() => store.deleteTrackFromQueue(track.id)}
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
});
