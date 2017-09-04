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

// const Player = (props: { resolveUrl: string }) => (
//     // should also have components for
//     // title, poster's username, likes_count, playback_count

// );

class Player extends React.Component<{ resolveUrl: string, artwork_url: string }, {}> {
    state = {
        isReady: false
    };

    _trackReady = event => {
        console.log('Track is ready', event);
    };

    render() {
        const { artwork_url } = this.props;

        return (
            <PlayerWrapper>
                <SoundPlayerContainer
                    clientId={getClientID()}
                    resolveUrl={this.props.resolveUrl}
                    onReady={this._trackReady}
                >
                    <PlayPause background={BASE_COLOR} color={COLOR} artwork={artwork_url} />
                    <MiddleSection baseColor={BASE_COLOR} coverColor={COVER_COLOR} />
                </SoundPlayerContainer>
            </PlayerWrapper>
        );
    }
}

export default Player;
