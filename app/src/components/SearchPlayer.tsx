/// <reference path="../index.d.ts"/>

import React from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer } from 'react-soundplayer/components';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import classNames from 'styled-classnames';
import { Track } from '../typings/SC';
import { progressStyleClass } from '../utils/common-classnames';

export type SearchPlayerProps = {
  onAddClick: (trackId: Track['id']) => void;
  resolveUrl: Track['permalink_url'];
  clientId: string;
  track: Track;
  currentTime?: number;
};

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

const usernameStyleClass = classNames`
    font-size: 1.2rem;
    color: lightslategrey;
    font-weight: 500;
`;

export const SearchPlayer: React.FC<SearchPlayerProps> = withSoundCloudAudio(
  (props: SearchPlayerProps) => {
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
                  <Header as="h3" color="grey">
                    {track.title}
                  </Header>
                  <a
                    className={usernameStyleClass()}
                    href={track.user.permalink_url}
                    target="__blank"
                  >
                    {track.user.username}
                  </a>
                </Grid.Column>
                <Grid.Column
                  width={4}
                  style={{ padding: 0, textAlign: 'right' }}
                >
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
                  <Timer
                    duration={track ? track.duration / 1000 : 0}
                    currentTime={currentTime}
                    {...props}
                  />
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
