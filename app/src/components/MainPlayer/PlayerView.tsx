import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  PlayButton,
  PrevButton,
  NextButton,
  Progress,
} from 'react-soundplayer/components';
import { Grid, Segment } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';

export interface MainPlayerProps {
  onPrevClick: Function;
  onPlayClick: Function;
  onNextClick: Function;
  track: Track;
  playlist: { tracks: Track[] };
  resolveUrl: Track['permalink_url'];
  clientId: string;
  soundCloudAudio?: any;
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
  (props: MainPlayerProps) => {
    const { soundCloudAudio, ...restProps } = props;

    // this allows the SoundCloud API to create
    // a list of tracks for the internal playlist
    // that belongs to the SoundCloud SDK API.
    soundCloudAudio._playlist = props.playlist;
    const playerProps = {
      soundCloudAudio,
      ...restProps,
    };

    console.log(soundCloudAudio._playlistIndex);

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
            <Progress {...props} className={progressStyleClass()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
);
