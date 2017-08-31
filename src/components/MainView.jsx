import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Nav from './Nav';

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
				<Nav />
			</MainViewWrapper>
		);
	}
}
