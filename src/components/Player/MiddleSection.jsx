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

const MiddleSection = (props: { baseColor: string, coverColor: string, title: string, username: string }) => {
    let { title, username } = props;

    if (title.length > TEXT_LIMIT) {
        title = `${title.substring(0, TEXT_LIMIT)}...`;
    }

    return (
        <MiddleSectionWrapper>
            <TrackTitle target="__blank" href={checkProp(props, 'track', 'permalink_url')}>
                {title}
            </TrackTitle>
            <UserName>{username}</UserName>
            <Progress {...props} background={props.coverColor} color={props.baseColor} />
            <Timer {...props} color={props.baseColor} />
        </MiddleSectionWrapper>
    );
};

export default MiddleSection;
