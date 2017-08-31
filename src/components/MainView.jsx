import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import BaseView from './BaseView';

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

export default class ManView extends PureComponent {
	render() {
		return (
			<MainViewWrapper>
				<Nav />
				<BaseView />
			</MainViewWrapper>
		);
	}
}
