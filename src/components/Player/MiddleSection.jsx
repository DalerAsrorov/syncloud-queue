import React from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import Timer from './Timer';

const MiddleSectionWrapper = styled.section`flex: 1;`;

const MiddleSection = (props: { baseColor: string, altColor: string, coverColor: string }) => (
    <MiddleSectionWrapper>
        <Progress {...props} background={props.coverColor} color={props.baseColor} />
        <Timer {...props} color={props.baseColor} />
    </MiddleSectionWrapper>
);

export default MiddleSection;
