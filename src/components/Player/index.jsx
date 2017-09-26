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
    onAfterDelete?: Function,
    currentTrackID?: number,
    nextTrackID?: number
};

type State = {
    isReadyToPlay: boolean
};
class Player extends PureComponent<Props, State> {
    state = {
        isReadyToPlay: false
    };

    _setReady = () => {
        this.setState({
            isReadyToPlay: true
        });
    };

    render() {
        const { currentTrackID, track } = this.props;
        const { isReadyToPlay } = this.state;
        const { permalink_url: resolveUrl, nextTrackID } = track;

        return (
            <PlayerWrapper>
                <SoundPlayerContainer onReady={this._setReady} clientId={getClientID()} resolveUrl={resolveUrl}>
                    <PlayPause
                        track={track}
                        background={BASE_COLOR}
                        color={COLOR}
                        currentTrackID={currentTrackID}
                        isReadyToPlay={isReadyToPlay}
                    />
                    <MiddleSection
                        queueIsEmpty={this.props.queueIsEmpty}
                        currentTrackID={this.props.currentTrackID}
                        baseColor={BASE_COLOR}
                        coverColor={COVER_COLOR}
                        track={track}
                        firstAction={this.props.firstAction}
                        onFirstAction={this.props.onFirstAction}
                        firstActionColor={this.props.firstActionColor}
                        charLimit={this.props.charLimit}
                        secondAction={this.props.secondAction}
                        onSecondAction={this.props.onSecondAction}
                        onNextTrack={this.props.onNextTrack}
                        onSetNextTrack={this.props.onSetNextTrack}
                        onAfterDelete={this.props.onAfterDelete}
                        nextTrackID={nextTrackID}
                    />
                </SoundPlayerContainer>
            </PlayerWrapper>
        );
    }
}

export default Player;
