// @flow

import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/lib/fa';
import { checkProp } from '../../utils';
import ButtonWrapper from '../ButtonWrapper';
import Progress from './Progress';
import Timer from './Timer';

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
    track?: Object,
    queueIsEmpty: boolean,
    baseColor: string,
    coverColor: string,
    title: string,
    username: string,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    charLimit: number,
    secondAction?: string,
    onSecondAction?: Function
}) => {
    const { username, secondAction, onSecondAction, track, charLimit } = props;
    let { title } = props;
    let secondButton;

    if (title.length > charLimit) {
        title = `${title.trim().substring(0, charLimit)}...`;
    }

    const FirstActionIcon = FontAwesome[`${props.firstAction}`];

    return (
        <MiddleSectionWrapper>
            <Header>
                <TrackTitle target="__blank" href={checkProp(props, 'track', 'permalink_url')}>
                    {title}
                </TrackTitle>
                <ButtonWrapper color={props.firstActionColor}>
                    <button
                        onClick={ev => {
                            ev.preventDefault();
                            props.onFirstAction(track);

                            if (props.queueIsEmpty && onSecondAction) {
                                onSecondAction(track);
                            }
                        }}
                    >
                        <FirstActionIcon />
                    </button>
                    {secondButton}
                </ButtonWrapper>
            </Header>
            <UserName>{username}</UserName>
            <Progress {...props} background={props.coverColor} color={props.baseColor} />
            <Timer {...props} color={props.baseColor} />
        </MiddleSectionWrapper>
    );
};

export default MiddleSection;
