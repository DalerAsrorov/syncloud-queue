import React from 'react';
import { observer } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';

export interface MainPlayerProps {}

export const MainPlayer: React.FC<MainPlayerProps> = observer(() => {
  return (
    <Segment>
      <Header size="medium">Main player will be here</Header>
    </Segment>
  );
});
