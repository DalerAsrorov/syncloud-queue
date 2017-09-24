// @flow

import React from 'react';
import styled from 'styled-components';
import FaGithub from 'react-icons/lib/fa/github';

import logo from '../images/syncloud.png';

const IconLinkWrapper = styled.a`
    display: inline-flex;
    vertical-align: sub;
    text-decoration: none;
    font-size: 2.5em;
    float: right;
    color: ${props => props.iconColor};
    transition: color 0.3s ease-in;

    &:hover {
        color: #e49a53;
    }

    & > svg {
        vertical-align: baseline !important;
    }
`;

const NavWrapper = styled.nav`
    background: ${props => props.background};
    padding: 1px 15px;
`;

const HeaderImage = styled.img`
    height: 40px;
    vertical-align: sub;
`;

const REPO_LINK = 'https://github.com/DalerAsrorov/syncloud-queue';

const Nav = (props: { iconColor: string, background: string }) => (
    <NavWrapper background={props.background}>
        <HeaderImage src={logo} alt="SyncloudQueue Logo" />
        <IconLinkWrapper iconColor={props.iconColor} target="__blank" href={REPO_LINK}>
            <FaGithub />
        </IconLinkWrapper>
    </NavWrapper>
);

export default Nav;
