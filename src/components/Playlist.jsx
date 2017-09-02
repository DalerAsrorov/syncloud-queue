// @flow

import React from 'react';
import styled from 'styled-components';
import Player from '../containers/Player';

const PlaylistWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Playlist = (props: { tracks: Array<Object> }) => (
    <PlaylistWrapper>
        <Player />
    </PlaylistWrapper>
);

export default Playlist;
