import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FaGithub from 'react-icons/lib/fa/github';

const NavTitle = styled.h2`
	display: inline-block;
	width: 90%;
`;

const IconLinkWrapper = styled.a`
	text-decoration: none;
	font-size: 2em;
	display: inline-block;
	color: #000;
`;

const NavWrapper = styled.nav`
	background: #fff;
	padding: 1px 15px;
`;

const REPO_LINK = 'https://github.com/DalerAsrorov/syncloud-queue';

export default class Nav extends PureComponent {
	render() {
		return (
			<NavWrapper>
				<NavTitle> Syncloud Queue</NavTitle>
				<IconLinkWrapper target="__blank" href={REPO_LINK}>
					<FaGithub />
				</IconLinkWrapper>
			</NavWrapper>
		);
	}
}
