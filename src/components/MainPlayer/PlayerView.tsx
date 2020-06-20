import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { Progress, Timer } from 'react-soundplayer/components';
import { Button, Grid, Header, Icon, Image } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';
import { CurrentTrack } from '../../typings/utils';
import { progressStyleClass } from '../../utils/common-classnames';
import { observer } from 'mobx-react';

export interface MainPlayerProps {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onStopTrack: () => void;
  onReady: () => void;
  track: Track;
  resolveUrl: Track['permalink_url'] | string;
  currentTrackId: CurrentTrack['track']['id'] | null;
  clientId: string;
  duration?: number;
  soundCloudAudio?: Track['soundCloudAudio'];
  currentTime?: number;
  playing?: boolean;
}

enum PlayerSectionRation {
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
const controlsColumnStyle: React.CSSProperties = {
  padding: '0.5rem',
  height: '100%',
};
const controlsRowStyle: React.CSSProperties = {
  padding: '0',
  maxHeight: '45px',
};
export const PlayerView: React.FC<MainPlayerProps> = withSoundCloudAudio(
  observer((props: MainPlayerProps) => {
    const { soundCloudAudio, playing } = props;

    const play = () => {
      if (playing) {
        soundCloudAudio?.pause();
      } else {
        soundCloudAudio?.play();
      }
    };

    React.useEffect(() => {
      console.log('should start playing', props.currentTrackId, props.track.id);
      if (props.currentTrackId === props.track.id) {
        soundCloudAudio?.play();
      }
    }, [soundCloudAudio, props.currentTrackId, props.track.id]);

    return (
      <Grid verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={PlayerSectionRation.Controls}>
            <Grid columns={3} divided>
              <Grid.Row style={controlsRowStyle}>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={props.onPrevClick} icon>
                    <Icon name="step backward" />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={() => play()} icon>
                    <Icon
                      name={
                        playing ? 'pause circle outline' : 'play circle outline'
                      }
                    />
                  </Button>
                </Grid.Column>
                <Grid.Column style={controlsColumnStyle}>
                  <Button onClick={props.onNextClick} icon>
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
                        props.track && props.duration
                          ? props?.duration / 1000
                          : 0
                      }
                      currentTime={props.currentTime}
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
                    src={props.track.artwork_url}
                    style={{ padding: '0.5rem' }}
                  />
                </Grid.Column>
                <Grid.Column width="12">
                  <Header as="h3">
                    <Header.Content>
                      {props.track.title}
                      <Header.Subheader>
                        {props.track.user.username}
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
