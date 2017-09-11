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

const TEXT_LIMIT = 80;

// const CustomButtonWrapper = styled.div`
//     float: right;

//     & > button {
//         background: transparent;
//         color: ${POSITIVE};
//         border: none;
//         outline: none;
//         font-size: 1em;
//     }
// `;
const Header = styled.header``;

const MiddleSection = (props: {
    track?: Object,
    baseColor: string,
    coverColor: string,
    title: string,
    username: string,
    firstAction: string,
    onFirstAction: Function,
    firstActionColor: string,
    secondAction?: string,
    onSecondAction?: Function
}) => {
    const { username, secondAction, onSecondAction, track } = props;
    let { title } = props;
    let secondButton;

    if (title.length > TEXT_LIMIT) {
        title = `${title.trim().substring(0, TEXT_LIMIT)}...`;
    }

    if (secondAction && onSecondAction) {
        secondButton = (
            <button
                onClick={ev => {
                    ev.preventDefault();
                    onSecondAction(track);
                }}
            >
                {props.secondAction}
            </button>
        );
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
