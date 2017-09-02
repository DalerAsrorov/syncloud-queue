// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { getClientID } from '../../api';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import PlayPause from './PlayPause';
import Progress from './Progress';

const PlayerWrapper = styled.article``;
const BASE_COLOR = '#e49a53';
const COLOR = '#fff';
const TEXT_COLOR = '#000';

const RESOLVE_URL_TEST = 'https://soundcloud.com/daler-asrorov/daler-asrorov-not-a-lullaby-preview-demo';

export default class Player extends Component<{}, {}> {
    _trackReady = (event: SyntheticInputEvent<HTMLInputElement>) => {
        console.log('Ready', event);
    };

    render() {
        return (
            <PlayerWrapper>
                <SoundPlayerContainer clientId={getClientID()} resolveUrl={RESOLVE_URL_TEST} onReady={this._trackReady}>
                    <PlayPause background={BASE_COLOR} color={COLOR} />
                    <Progress color={BASE_COLOR} />
                </SoundPlayerContainer>
            </PlayerWrapper>
        );
    }
}
