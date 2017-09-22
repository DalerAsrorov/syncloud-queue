// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { BASE_COLOR, COLOR, COVER_COLOR } from '../../theme';
import { getClientID } from '../../api';
import PlayPause from './PlayPause';
import MiddleSection from './MiddleSection';

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
    track: Object,
    queueIsEmpty: boolean,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function,
    currentTrackID?: number,
    nextTrackID?: number
};

type State = {
    isReadyToPlay: boolean
}
class Player extends PureComponent<Props, State> {
    state = {
        isReadyToPlay: false
    }

    _setReady = () => {
        this.setState({
            isReadyToPlay: true
        });
    }

    render() {
        const { track } = this.props;
        const { id, artwork_url: artwork, permalink_url: resolveUrl, stream_url: streamUrl, title, username, avatar_url: avatar } = track;

        const trackObject = {
            id,
            artwork,
            resolveUrl,
            streamUrl,
            title,
            username,
            avatar
        };

        const { isReadyToPlay } = this.state;

        return (
            <PlayerWrapper>
                <SoundPlayerContainer
                    onReady={this._setReady}
                    clientId={getClientID()}
                    streamUrl={streamUrl}
                    resolveUrl={resolveUrl}
                >
                    <PlayPause
                        id={id}
                        background={BASE_COLOR}
                        color={COLOR}
                        artwork={artwork}
                        avatar={avatar}
                        currentTrack={this.props.currentTrack}
                        isReadyToPlay={isReadyToPlay}
                    />
                    <MiddleSection
                        queueIsEmpty={this.props.queueIsEmpty}
                        currentTrackID={this.props.currentTrackID}
                        baseColor={BASE_COLOR}
                        coverColor={COVER_COLOR}
                        track={trackObject}
                        firstAction={this.props.firstAction}
                        onFirstAction={this.props.onFirstAction}
                        firstActionColor={this.props.firstActionColor}
                        charLimit={this.props.charLimit}
                        secondAction={this.props.secondAction}
                        onSecondAction={this.props.onSecondAction}
                        onNextTrack={this.props.onNextTrack}
                        onSetNextTrack={this.props.onSetNextTrack}
                        nextTrackID={this.props.nextTrackID}
                    />
                </SoundPlayerContainer>
            </PlayerWrapper>
        );
    }
}

export default Player;
