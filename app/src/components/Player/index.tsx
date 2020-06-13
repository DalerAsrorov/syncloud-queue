/// <reference path="../../index.d.ts"/>

import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { Segment } from 'semantic-ui-react';

type PlayerProps = any;

export const Player: React.FC<PlayerProps> = withSoundCloudAudio(
  (props: PlayerProps) => {
    const { track, currentTime } = props;
    const { nextTrackID } = track;

    console.log(props);

    return (
      <Segment>
        <PlayButton
          onPlayClick={() => {
            console.log('play button clicked!');
          }}
          {...props}
        />
        <h2 className="custom-player-title">
          {track ? track.title : 'Loading...'}
        </h2>
        <Timer
          duration={track ? track.duration / 1000 : 0}
          currentTime={currentTime}
          {...props}
        />
      </Segment>
    );
  }
);
