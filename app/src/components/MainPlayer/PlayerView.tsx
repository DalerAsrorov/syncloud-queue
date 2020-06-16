import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  NextButton,
  PlayButton,
  PrevButton,
  Progress,
} from 'react-soundplayer/components';
import { Grid, Segment } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';
import { observer } from 'mobx-react';
import { useStore } from '../../store-context';

export interface MainPlayerProps {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  currentTrackIndex: number;
  track: Track;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  playlist: { tracks: Track[] };
  soundCloudAudio?: Track['soundCloudAudio'];
  streamUrl?: string;
  currentTime?: number;
}

export enum PlayerSectionRation {
  Controls = 3,
  Progress = 8,
}

const controlButtonStyleClass = classNames`
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  color: #6435c9;
  background: transparent;

  & > svg {
    width: 70%;
    height: 70%;
  }
`;

const controlsColumnStyle: Partial<CSSStyleDeclaration> = {
  padding: '0.5rem',
  height: '100%',
};
const controlsRowStyle: Partial<CSSStyleDeclaration> = {
  padding: '0',
  maxHeight: '45px',
};

export const PlayerView: React.FC<MainPlayerProps> = withSoundCloudAudio(
  observer((props: MainPlayerProps) => {
    const { soundCloudAudio, ...restProps } = props;
    let playerProps: MainPlayerProps = {
      ...restProps,
    };

    if (soundCloudAudio) {
      // this allows the SoundCloud API to create
      // a list of tracks for the internal playlist
      // that belongs to the SoundCloud SDK API.
      soundCloudAudio._playlist = props.playlist;
      soundCloudAudio._playlistIndex = props.currentTrackIndex;
    }

    return (
      <Grid as={Segment} verticalAlign="middle" style={{ margin: 0 }}>
        <Grid.Row>
          <Grid.Column width={PlayerSectionRation.Controls}>
            <Grid columns={3} divided>
              <Grid.Row style={controlsRowStyle}>
                <Grid.Column style={controlsColumnStyle}>
                  <PrevButton
                    className={controlButtonStyleClass()}
                    {...playerProps}
                  />
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <PlayButton
                    className={controlButtonStyleClass()}
                    {...playerProps}
                  />
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <NextButton
                    className={controlButtonStyleClass()}
                    {...playerProps}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={PlayerSectionRation.Progress}>
            <Progress {...playerProps} className={progressStyleClass()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  })
);
