// @flow

import React from 'react';
import styled from 'styled-components';
import { checkProp } from '../../utils';
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

const TEXT_LIMIT = 100;

const CustomButtonWrapper = styled.div`float: right;`;
const Header = styled.header``;

const MiddleSection = (props: {
    baseColor: string,
    coverColor: string,
    title: string,
    username: string,
    firstAction: string,
    onFirstAction: Function,
    secondAction?: string,
    onSecondAction?: Function
}) => {
    let { title, username } = props;
    let secondButton;

    if (title.length > TEXT_LIMIT) {
        title = `${title.substring(0, TEXT_LIMIT)}...`;
    }

    if (props.secondAction && props.onSecondAction) {
        secondButton = (
            <button
                onClick={ev => {
                    ev.preventDefault();
                    console.log(props.track);
                }}
            >
                {props.secondAction}
            </button>
        );
    }

    return (
        <MiddleSectionWrapper>
            <Header>
                <TrackTitle target="__blank" href={checkProp(props, 'track', 'permalink_url')}>
                    {title}
                </TrackTitle>
                <CustomButtonWrapper>
                    <button
                        onClick={ev => {
                            ev.preventDefault();
                            console.log(props.track);
                        }}
                    >
                        {props.firstAction}
                    </button>
                    {secondButton}
                </CustomButtonWrapper>
            </Header>
            <UserName>{username}</UserName>
            <Progress {...props} background={props.coverColor} color={props.baseColor} />
            <Timer {...props} color={props.baseColor} />
        </MiddleSectionWrapper>
    );
};

export default MiddleSection;
