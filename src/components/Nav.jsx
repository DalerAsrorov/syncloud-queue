// @flow

import React from 'react';
import styled from 'styled-components';
import FaGithub from 'react-icons/lib/fa/github';

const NavTitle = styled.h2`
	display: inline-block;
	width: 85%;
`;

const IconLinkWrapper = styled.a`
	text-decoration: none;
	font-size: 2.5em;
	display: inline-block;
	color: #000;
	transition: color 0.3s ease-in;

	&:hover {
		color: #e49a53;
	}
`;

const NavWrapper = styled.nav`
	background: #fff;
	padding: 1px 15px;
`;

const REPO_LINK = 'https://github.com/DalerAsrorov/syncloud-queue';

const Nav = () => (
	<NavWrapper>
		<NavTitle> Syncloud Queue</NavTitle>
		<IconLinkWrapper target="__blank" href={REPO_LINK}>
			<FaGithub />
		</IconLinkWrapper>
	</NavWrapper>
);

export default Nav;
