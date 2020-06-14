import React from 'react';
import { observer } from 'mobx-react';
import { List, Image } from 'semantic-ui-react';
import { useStore } from '../store-context';

export interface MyTracklistProps {}

export const MyTrackList: React.FC<MyTracklistProps> = observer(() => {
  const { myTracklist, queryTracklistMap } = useStore();

  return (
    <List animated verticalAlign="middle" divided relaxed="very" size="large">
      {myTracklist.map((trackId) => {
        const trackInfo = queryTracklistMap[trackId];

        return (
          <List.Item key={trackInfo.id}>
            <Image avatar src={trackInfo.artwork_url} />
            <List.Content>
              <List.Header>{trackInfo.title}</List.Header>
              <List.Description>{trackInfo.user.username}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
});
