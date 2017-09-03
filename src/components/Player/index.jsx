// @flow

import React from 'react';
import styled from 'styled-components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { BASE_COLOR, COLOR, TEXT_COLOR, COVER_COLOR } from '../../theme';
import { getClientID } from '../../api';
import PlayPause from './PlayPause';
import Progress from './Progress';
import Timer from './Timer';

const PlayerWrapper = styled.article``;

const Player = (props: { resolveUrl: string }) => (
    <PlayerWrapper>
        <SoundPlayerContainer clientId={getClientID()} resolveUrl={props.resolveUrl}>
            <PlayPause background={BASE_COLOR} color={COLOR} />
            <Progress background={COVER_COLOR} color={BASE_COLOR} />
            <Timer color={BASE_COLOR} />
        </SoundPlayerContainer>
    </PlayerWrapper>
);

export default Player;
