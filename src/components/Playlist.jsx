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

const Playlist = (props: { tracks: Array<Object> }) => (
    <PlaylistWrapper>
        {props.tracks.map(({ permalink_url, artwork_url, id, title, user: { username, avatar_url } }) => (
            <Player
                key={id}
                artwork={artwork_url}
                resolveUrl={permalink_url}
                title={title}
                username={username}
                avatar={avatar_url}
            />
        ))}
    </PlaylistWrapper>
);

export default Playlist;
