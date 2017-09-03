// @flow

import React from 'react';
import styled from 'styled-components';
import styledClass from 'styled-classnames';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { BASE_COLOR, COLOR, TEXT_COLOR, COVER_COLOR } from '../../theme';
import { getClientID } from '../../api';
import PlayPause from './PlayPause';
import MiddleSection from './MiddleSection';

const PLAYER_CLASS_NAME = 'sq-player';

const PlayerWrapper = styled.article`
    margin: 3px;
    padding: 3px;
    border: 1px solid ${COVER_COLOR};
    height: 80px;

    & > span {
        display: flex;
        height: 100%;
    }
`;

const Player = (props: { resolveUrl: string }) => (
    // should also have components for
    // title, poster's username, likes_count, playback_count
    <PlayerWrapper>
        <SoundPlayerContainer clientId={getClientID()} resolveUrl={props.resolveUrl}>
            <PlayPause background={BASE_COLOR} color={COLOR} />
            <MiddleSection baseColor={BASE_COLOR} coverColor={COVER_COLOR} />
        </SoundPlayerContainer>
    </PlayerWrapper>
);

export default Player;
