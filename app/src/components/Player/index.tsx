/// <reference path="../../index.d.ts"/>

import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { Grid, Segment } from 'semantic-ui-react';

type PlayerProps = any;

export const Player: React.FC<PlayerProps> = withSoundCloudAudio(
  (props: PlayerProps) => {
    const { track, currentTime } = props;
    const { nextTrackID } = track;

    return (
      <Grid as={Segment} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={4} stretched>
            <PlayButton
              style={{ cursor: 'pointer' }}
              onPlayClick={() => {
                console.log('play button clicked!');
              }}
              {...props}
            />
          </Grid.Column>
          <Grid.Column width={9} stretched>
            <h2 className="custom-player-title">
              {track ? track.title : 'Loading...'}
            </h2>
          </Grid.Column>
          <Grid.Column width={3} stretched>
            <Timer
              duration={track ? track.duration / 1000 : 0}
              currentTime={currentTime}
              {...props}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
);
