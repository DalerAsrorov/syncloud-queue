/// <reference path="../../index.d.ts"/>

import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton, Timer, Progress } from 'react-soundplayer/components';
import classNames from 'styled-classnames';
import { Grid, Segment } from 'semantic-ui-react';

type PlayerProps = any;

const playButtonStyleClass = classNames`
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 1rem;
  border: none;
  outline: none;
  background: ${(props: { artwork: string }) => `url(${props.artwork})`};
  color: #fff;
  background-size: cover;

  & > svg {
    width: 50%;
    height: 50%;
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

export const Player: React.FC<PlayerProps> = withSoundCloudAudio(
  (props: PlayerProps) => {
    const { track, currentTime } = props;
    const { nextTrackID } = track;
    const artwork = track.artwork_url
      ? track.artwork_url
      : track.user.avatar_url;

    console.log(track);

    return (
      <Grid as={Segment} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={4} stretched>
            <PlayButton
              className={playButtonStyleClass({ artwork })}
              onPlayClick={() => {
                console.log('play button clicked!');
              }}
              {...props}
            />
          </Grid.Column>
          <Grid.Column width={9} stretched>
            <h3>{track.title}</h3>
            <Progress {...props} className={progressStyleClass()} />
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
