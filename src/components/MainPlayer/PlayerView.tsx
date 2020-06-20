import React from 'react';
import { Progress, Timer } from 'react-soundplayer/components';
import { Button, Grid, Header, Icon, Image } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';
import { withSoundCloudAudio } from 'react-soundplayer/addons';

export interface MainPlayerProps {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  isReady: boolean;
  isCurrentTrack: boolean;
  track: Track;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  duration?: number;
  soundCloudAudio?: Track['soundCloudAudio'];
  playing?: boolean;
  streamUrl?: string;
  currentTime?: number;
}

export interface MainPlayerState {
  isPaused: boolean;
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

class PlayerView extends React.Component<MainPlayerProps, MainPlayerState> {
  state = {
    isPaused: false,
  };

  componentDidUpdate() {
    this.startPlayingIfReady();
  }

  private startPlayingIfReady(props?: MainPlayerProps) {
    const { isCurrentTrack, isReady, soundCloudAudio } = props || this.props;

    if (isReady && isCurrentTrack && !this.state.isPaused) {
      soundCloudAudio!.play();
    }
  }

  play = () => {
    const { playing, soundCloudAudio } = this.props;

    if (playing) {
      soundCloudAudio!.pause();
      this.setState({
        isPaused: true,
      });
    } else {
      soundCloudAudio!.play();
      this.setState({
        isPaused: false,
      });
    }
  };

  render() {
    const { props } = this;
    const { track, currentTime, playing } = props;

    return (
      <Grid verticalAlign="middle" style={{ margin: 0 }}>
        <Grid.Row>
          <Grid.Column width={PlayerSectionRation.Controls}>
            <Grid columns={3} divided>
              <Grid.Row style={controlsRowStyle}>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={props.onPrevClick}>
                    <Icon name="step backward" color="violet" />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={() => this.play()}>
                    <Icon
                      name={playing ? 'pause circle' : 'play circle'}
                      color="violet"
                    />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={props.onNextClick}>
                    <Icon name="step forward" color="violet" />
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
}

export default withSoundCloudAudio(PlayerView);
