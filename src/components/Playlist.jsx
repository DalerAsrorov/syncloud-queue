// @flow

import React from 'react';
import styled from 'styled-components';
import Player from './Player';

const PlaylistWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Playlist = (props: {
    tracks: Array<Object>,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    queueIsEmpty: boolean,
    isPurePlaylist: boolean,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function,
    currentTrackID?: number
}) => {
    const { tracks, ...restProps } = props;

    return (
        <PlaylistWrapper>
            {tracks.map(track => {
                return <Player key={track.id} track={track} {...restProps} />;
            })}
        </PlaylistWrapper>
    );
};

export default Playlist;
