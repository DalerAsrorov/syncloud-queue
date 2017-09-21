// @flow

import React from 'react';
import styled from 'styled-components';
import Player from './Player';

const PlaylistWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const RESOLVE_URL_TEST = 'https://soundcloud.com/zion22be/joji-medicine-beat-extended';

const Playlist = (props: {
    tracks: Array<Object>,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    queueIsEmpty: boolean,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function,
    currentTrackID?: number
}) => {
    return (
        <PlaylistWrapper>
            {props.tracks.map(
                ({ permalink_url, artwork_url, id, title, user: { username, avatar_url }, nextTrackID }) => (
                    <Player
                        key={id}
                        id={id}
                        queueIsEmpty={props.queueIsEmpty}
                        artwork={artwork_url}
                        resolveUrl={permalink_url}
                        title={title}
                        username={username}
                        avatar={avatar_url}
                        firstAction={props.firstAction}
                        onFirstAction={props.onFirstAction}
                        firstActionColor={props.firstActionColor}
                        charLimit={props.charLimit}
                        secondAction={props.secondAction}
                        onSecondAction={props.onSecondAction}
                        onSetNextTrack={props.onSetNextTrack}
                        onNextTrack={props.onNextTrack}
                        currentTrackID={props.currentTrackID}
                        nextTrackID={nextTrackID}
                    />
                )
            )}
        </PlaylistWrapper>
    );
};

export default Playlist;
