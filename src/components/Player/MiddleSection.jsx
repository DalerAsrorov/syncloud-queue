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

const MiddleSection = (props: { baseColor: string, coverColor: string }) => {
    let trackTitle = checkProp(props, 'track', 'title');

    if (trackTitle.length > TEXT_LIMIT) {
        trackTitle = `${trackTitle.substring(0, TEXT_LIMIT)}...`;
    }

    return (
        <MiddleSectionWrapper>
            <TrackTitle target="__blank" href={checkProp(props, 'track', 'permalink_url')}>
                {trackTitle}
            </TrackTitle>
            <UserName>{checkProp(props, 'track', 'user', 'username')}</UserName>
            <Progress {...props} background={props.coverColor} color={props.baseColor} />
            <Timer {...props} color={props.baseColor} />
        </MiddleSectionWrapper>
    );
};

export default MiddleSection;
