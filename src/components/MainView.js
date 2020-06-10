// @flow

import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import BaseView from './BaseView';
import { TEXT_COLOR, COLOR } from '../theme';

const MainViewWrapper = styled.div`
    height: 100vh;
    padding: 5px;
    box-sizing: border-box;
    background: #e49a53;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    white-space: pre;

    & * {
        border-radius: 10px;
    }
`;

const MainView = (props: {}) => (
    <MainViewWrapper>
        <Nav iconColor={TEXT_COLOR} background={COLOR} />
        <BaseView />
    </MainViewWrapper>
);

export default MainView;