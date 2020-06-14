import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton } from 'react-soundplayer/components';
import { Grid, Segment } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';

export interface MainPlayerProps {
  track: Track;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  currentTime?: number;
}

export enum PlayerSectionRation {
  Controls = 4,
  Progress = 8,
}

const playButtonStyleClass = classNames`
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  color: cyan;
  background: transparent;

  & > svg {
    width: 70%;
    height: 70%;
  }
`;

const progressStyleClass = classNames`
    cursor: pointer;
    width: 100%;
    height: 10px;
    background: skyblue;

    & > div {
        background: cyan;
        height: 100%;
        transition: width .2s ease-in;
    }
`;

export const PlayerView: React.FC<MainPlayerProps> = withSoundCloudAudio(
  (props: any) => (
    <Grid as={Segment} verticalAlign="middle" style={{ margin: 0 }}>
      <Grid.Row>
        <Grid.Column width={PlayerSectionRation.Controls}>
          <Grid columns={2}>
            <Grid.Row style={{ padding: '0', maxHeight: '45px' }}>
              <Grid.Column style={{ padding: 0, height: '100%' }}>
                <PlayButton
                  className={playButtonStyleClass()}
                  onPlayClick={() => {
                    console.log('play button clicked!');
                  }}
                  {...props}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: 0, height: '100%' }}>
                <PlayButton
                  className={playButtonStyleClass()}
                  onPlayClick={() => {
                    console.log('play button clicked!');
                  }}
                  {...props}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column color="red" width={PlayerSectionRation.Progress}>
          hello
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
);
