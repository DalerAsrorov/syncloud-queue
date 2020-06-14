import { observer } from 'mobx-react';
import React from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import { Track } from '../api/SC';
import { useStore } from '../store-context';

export interface MyTracklistProps {}

export const MyTrackList: React.FC<MyTracklistProps> = observer(() => {
  const store = useStore();

  return (
    <List verticalAlign="middle" divided relaxed="very" size="large">
      {store.myTrackListAsList.map((track) => {
        return (
          <List.Item key={track.id}>
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
  );
});
