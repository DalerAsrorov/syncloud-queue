import React, { PureComponent } from 'react';
import styled from 'styled-components';

const MainViewWrapper = styled.div`
	height: 100vh;
	padding: 5px;
	box-sizing: border-box;
	background: #e49a53;
`;

export default class ManView extends PureComponent {
	render() {
		return (
			<MainViewWrapper>
				<nav className="navbar">
					<h2>Syncloud Queue</h2>
				</nav>
			</MainViewWrapper>
		);
	}
}
