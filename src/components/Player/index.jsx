// @flow

import React, { Component } from 'react';
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
    id: number,
    resolveUrl: string,
    artwork: string,
    title: string,
    username: string,
    avatar: string,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    secondAction?: string,
    onSecondAction?: Function,
    currentTrack?: Object
};

class Player extends Component<Props, {}> {
    componentDidMount() {
        const { id, currentTrack } = this.props;

        // check if the currently selected track
        // matches the ID of this particular track
    }

    render() {
        return (
            <PlayerWrapper>
                <SoundPlayerContainer clientId={getClientID()} resolveUrl={this.props.resolveUrl}>
                    <PlayPause
                        background={BASE_COLOR}
                        color={COLOR}
                        artwork={this.props.artwork}
                        avatar={this.props.avatar}
                    />
                    <MiddleSection
                        baseColor={BASE_COLOR}
                        coverColor={COVER_COLOR}
                        title={this.props.title}
                        username={this.props.username}
                        firstAction={this.props.firstAction}
                        onFirstAction={this.props.onFirstAction}
                        firstActionColor={this.props.firstActionColor}
                        charLimit={this.props.charLimit}
                        secondAction={this.props.secondAction}
                        onSecondAction={this.props.onSecondAction}
                    />
                </SoundPlayerContainer>
            </PlayerWrapper>
        );
    }
}

export default Player;
