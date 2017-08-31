import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FaGithub from 'react-icons/lib/fa/github';

const MainViewWrapper = styled.div`
	height: 100vh;
	padding: 5px;
	box-sizing: border-box;
	background: #e49a53;
`;

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

export default class ManView extends PureComponent {
	render() {
		return (
			<MainViewWrapper>
				<NavWrapper>
					<NavTitle> Syncloud Queue</NavTitle>
					<IconLinkWrapper target="__blank" href={REPO_LINK}>
						<FaGithub />
					</IconLinkWrapper>
				</NavWrapper>
			</MainViewWrapper>
		);
	}
}
