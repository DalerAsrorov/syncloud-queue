import { observer } from 'mobx-react';
import React from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import { Track } from '../api/SC';
import { useStore } from '../store-context';

export interface MyTracklistProps {}

export const MyTrackList: React.FC<MyTracklistProps> = observer(() => {
  const store = useStore();

  const handleDeleteTrack = (id: Track['id']) => {
    store.deleteTrackFromQueue(id);
  };

  return (
    <List verticalAlign="middle" divided relaxed="very" size="large">
      {store.myTracklist.map((trackId) => {
        const trackInfo = store.queryTracklistMap[trackId];

        return (
          <List.Item key={trackInfo.id}>
            <Image avatar src={trackInfo.artwork_url} />
            <List.Content>
              <List.Header>{trackInfo.title}</List.Header>
              <List.Description>{trackInfo.user.username}</List.Description>
            </List.Content>
            <List.Content floated="right">
              <Button
                onClick={() => handleDeleteTrack(trackId)}
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
  );
});
