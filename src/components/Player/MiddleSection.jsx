// @flow

import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/lib/fa';
import { checkProp } from '../../utils';
import ButtonWrapper from '../ButtonWrapper';
import Progress from './Progress';
import Timer from './Timer';
import Next from './Next';

const MiddleSectionWrapper = styled.section`
    flex: 1;
    display: flex;
    flex-flow: column;
    padding: 0 5px;

    & > * {
        margin: 2px;
    }
`;

const TrackTitle = styled.a`font-weight: 600;`;
const UserName = styled.div`font-size: 12px;`;
const Header = styled.header``;

const MiddleSection = (props: {
    track: Object,
    queueIsEmpty: boolean,
    isReadyToPlay: boolean,
    baseColor: string,
    coverColor: string,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function,
    onAfterDelete?: Function,
    currentTrackID?: number,
    nextTrackID?: number,
    numberOfTracks?: number
}) => {
    const {
        onSecondAction,
        onSetNextTrack,
        track,
        charLimit,
        currentTrackID,
        nextTrackID,
        onNextTrack,
        onAfterDelete,
        numberOfTracks
    } = props;
    const { id, user: { username } } = track;

    let { title } = track;
    let NextButton, FirstActionButton;

    if (title.length > charLimit) {
        title = `${title.trim().substring(0, charLimit)}...`;
    }

    // TODO: add another condition that checks whether
    // current player component has next track object
    // console.log(`${currentTrackID} ${id} ${nextTrackID} ${onNextTrack}`);
    if (currentTrackID && id === currentTrackID && nextTrackID && onNextTrack) {
        NextButton = <Next color={props.baseColor} {...props} onNextTrack={onNextTrack} nextTrackID={nextTrackID} />;
    }

    const FirstActionIcon = FontAwesome[`${props.firstAction}`];

    const _onClick = ev => {
        ev.preventDefault();
        if (onSetNextTrack) {
            onSetNextTrack(track);
        }

        props.onFirstAction(track);

        if (props.queueIsEmpty && onSecondAction) {
            onSecondAction(id);
        }

        if (onAfterDelete && numberOfTracks) {
            onAfterDelete({ id, nextTrackID, currentTrackID, numberOfTracks });
        }
    };

    if (props.isReadyToPlay) {
        FirstActionButton = (
            <ButtonWrapper color={props.firstActionColor}>
                <button onClick={_onClick}>
                    <FirstActionIcon />
                </button>
                {NextButton}
            </ButtonWrapper>
        );
    }

    return (
        <MiddleSectionWrapper>
            <Header>
                <TrackTitle target="__blank" href={checkProp(props, 'track', 'permalink_url')}>
                    {title}
                </TrackTitle>

                {FirstActionButton}
            </Header>
            <UserName>{username}</UserName>
            <Progress
                {...props}
                onTrackEnd={props.onFirstAction}
                background={props.coverColor}
                color={props.baseColor}
            />
            <Timer {...props} color={props.baseColor} />
        </MiddleSectionWrapper>
    );
};

export default MiddleSection;
