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
    padding: 3px;
    border: 1px solid ${COVER_COLOR};
    height: 80px;
    display: block;
    width: 98%;
    margin: 3px auto;

    & > span {
        display: flex;
        height: 100%;
    }
`;

type Props = {
    resolveUrl: string,
    artwork: string,
    title: string,
    username: string,
    avatar: string,
    firstAction: string,
    onFirstAction: Function,
    secondAction?: string,
    onSecondAction?: Function
};

const Player = (props: Props) => (
    <PlayerWrapper>
        <SoundPlayerContainer clientId={getClientID()} resolveUrl={props.resolveUrl}>
            <PlayPause background={BASE_COLOR} color={COLOR} artwork={props.artwork} avatar={props.avatar} />
            <MiddleSection
                baseColor={BASE_COLOR}
                coverColor={COVER_COLOR}
                title={props.title}
                username={props.username}
                firstAction={props.firstAction}
                onFirstAction={props.onFirstAction}
                secondAction={props.secondAction}
                onSecondAction={props.onSecondAction}
            />
        </SoundPlayerContainer>
    </PlayerWrapper>
);

export default Player;
