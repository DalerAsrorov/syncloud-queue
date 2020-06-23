import React, { CSSProperties, useEffect } from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { Progress, Timer } from 'react-soundplayer/components';
import { Button, Grid, Header, Icon, Image } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { EnhancedTrack, Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';

export interface MainPlayerProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  onReady: (trackId: EnhancedTrack['id'], isReady: boolean) => void;
  track: Track;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  playlist: { tracks: Track[] };
  isReady: boolean;
  isCurrentTrack: boolean;
  soundCloudAudio?: Track['soundCloudAudio'];
  streamUrl?: string;
  duration?: number;
  currentTime?: number;
  playing?: boolean;
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

const controlsColumnStyle: CSSProperties = {
  padding: '0.5rem',
  height: '100%',
};
const controlsRowStyle: CSSProperties = {
  padding: '0',
  maxHeight: '45px',
};
const inactiveTrackStyle: CSSProperties = {
  visibility: 'hidden',
  height: 0,
  width: 0,
  padding: 0,
};

const makeContainerStyles = (isActive: boolean): CSSProperties => {
  let style: CSSProperties = {
    margin: 0,
  };

  if (!isActive) {
    style = {
      ...style,
      ...inactiveTrackStyle,
    };
  }

  return style;
};

export const PlayerView: React.FC<MainPlayerProps> = withSoundCloudAudio(
  (props: MainPlayerProps) => {
    const {
      soundCloudAudio,
      track,
      currentTime,
      isReady,
      isCurrentTrack,
      playing,
    } = props;

    useEffect(() => {
      if (isReady && isCurrentTrack) {
        soundCloudAudio!.play();
      }
    }, [soundCloudAudio, isReady, isCurrentTrack]);

    const play = () => {
      if (playing) {
        soundCloudAudio!.pause();
      } else {
        soundCloudAudio!.play();
      }
    };

    return (
      <Grid verticalAlign="middle" style={makeContainerStyles(isCurrentTrack)}>
        <Grid.Row>
          <Grid.Column width={PlayerSectionRation.Controls}>
            <Grid columns={3} divided>
              <Grid.Row style={controlsRowStyle}>
                <Grid.Column style={controlsColumnStyle}>
                  <Button
                    icon
                    onClick={props.onPrevClick}
                    className={controlButtonStyleClass()}
                  >
                    <Icon name="step backward" />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button
                    icon
                    onClick={() => play()}
                    className={controlButtonStyleClass()}
                  >
                    <Icon name="play circle" />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button
                    icon
                    onClick={props.onNextClick}
                    className={controlButtonStyleClass()}
                  >
                    <Icon name="step forward" />
                  </Button>
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
                  <Progress {...props} className={progressStyleClass()} />
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle} width="4">
                  <Header style={{ margin: 0 }} size="small" color="pink">
                    <Timer
                      duration={
                        track && props.duration ? props?.duration / 1000 : 0
                      }
                      currentTime={currentTime}
                      className={controlButtonStyleClass()}
                      {...props}
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
                    src={track.artwork_url}
                    style={{ padding: '0.5rem' }}
                  />
                </Grid.Column>
                <Grid.Column width="12">
                  <Header as="h3">
                    <Header.Content>
                      {track.title}
                      <Header.Subheader>{track.user.username}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
);
