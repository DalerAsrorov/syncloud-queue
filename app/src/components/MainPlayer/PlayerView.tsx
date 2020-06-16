import { observer } from 'mobx-react';
import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  NextButton,
  PlayButton,
  PrevButton,
  Progress,
  Timer,
} from 'react-soundplayer/components';
import { Grid, Header, Image } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { CurrentTrack } from '../../createStore';
import { Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';

export interface MainPlayerProps {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  currentTrack: CurrentTrack;
  track: Track;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  playlist: { tracks: Track[] };
  duration?: number;
  soundCloudAudio?: Track['soundCloudAudio'];
  streamUrl?: string;
  currentTime?: number;
}

export enum PlayerSectionRation {
  Controls = 2,
  Progress = 7,
  TrackInfo = 7,
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
    const { soundCloudAudio, track, currentTime, currentTrack } = props;
    let playerProps: MainPlayerProps = {
      ...props,
    };

    if (soundCloudAudio) {
      // this allows the SoundCloud API to create
      // a list of tracks for the internal playlist
      // that belongs to the SoundCloud SDK API.
      soundCloudAudio._playlist = props.playlist;
      soundCloudAudio._playlistIndex = currentTrack.index;

      playerProps = {
        ...playerProps,
        soundCloudAudio,
      };
    }

    console.log({ playerProps });

    return (
      <Grid verticalAlign="middle" style={{ margin: 0 }}>
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
            <Grid verticalAlign="middle">
              <Grid.Row style={controlsRowStyle}>
                <Grid.Column
                  width="12"
                  verticalAlign="middle"
                  style={{ ...controlsColumnStyle, height: 'auto' }}
                >
                  <Progress {...playerProps} className={progressStyleClass()} />
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle} width="4">
                  <Header style={{ margin: 0 }} size="small" color="pink">
                    <Timer
                      duration={
                        track && props.duration ? props?.duration / 1000 : 0
                      }
                      currentTime={currentTime}
                      className={controlButtonStyleClass()}
                      {...playerProps}
                    />
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={PlayerSectionRation.TrackInfo}>
            <Grid verticalAlign="middle">
              <Grid.Row style={{ ...controlsRowStyle, maxHeight: 'auto' }}>
                <Grid.Column width="4">
                  <Image
                    size="tiny"
                    circular
                    centered
                    src={currentTrack.track.artwork_url}
                    style={{ padding: '0.5rem' }}
                  />
                </Grid.Column>
                <Grid.Column width="12">
                  <Header as="h3">
                    <Header.Content>
                      {currentTrack.track.title}
                      <Header.Subheader>
                        {currentTrack.track.user.username}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  })
);
