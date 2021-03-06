/// <reference path="../../index.d.ts"/>

import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer } from 'react-soundplayer/components';
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment,
  Placeholder,
} from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../../typings/SC';
import { progressStyleClass } from '../../utils/common-classnames';

export interface SearchPlayerViewProps {
  onAddClick: (trackId: Track['id']) => void;
  onReady?: () => void;
  isReady?: boolean;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  track: Track;
  currentTime?: number;
}

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

export const PlayerView: React.FC<SearchPlayerViewProps> = withSoundCloudAudio(
  (props: SearchPlayerViewProps) => {
    const { track, currentTime } = props;

    return (
      <Grid as={Segment} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={4} stretched>
            <PlayButton
              className={playButtonStyleClass({
                artwork: track.artwork_url,
              })}
              onPlayClick={() => {
                console.log('play button clicked!');
              }}
              {...props}
            />
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Grid padded>
              <Grid.Row>
                <Grid.Column width={12} style={{ padding: 0 }}>
                  <Header
                    color="teal"
                    size="medium"
                    as="a"
                    href={track.permalink_url}
                    target="__blank"
                  >
                    {track.title}
                    <Header.Subheader>{track.user.username}</Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column
                  width={4}
                  style={{ padding: 0, textAlign: 'right' }}
                >
                  {props.isReady ? (
                    <Button
                      onClick={() => {
                        props.onAddClick(track.id);
                      }}
                      icon
                      positive
                      compact
                      style={{ marginBottom: '0.5rem' }}
                    >
                      <Icon name="add circle" size="large" />
                    </Button>
                  ) : (
                    <div style={{ display: 'flex', flexFlow: 'row-reverse' }}>
                      <Placeholder style={{ width: '50%' }}>
                        <Placeholder.Line length="full" />
                      </Placeholder>
                    </div>
                  )}
                  {props.isReady ? (
                    <Header style={{ margin: 0 }} size="small" color="grey">
                      <Timer
                        duration={track ? track.duration / 1000 : 0}
                        currentTime={currentTime}
                        {...props}
                      />
                    </Header>
                  ) : (
                    <Placeholder style={{ margin: 0 }}>
                      <Placeholder.Line length="full" />
                    </Placeholder>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Progress {...props} className={progressStyleClass()} />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
);
