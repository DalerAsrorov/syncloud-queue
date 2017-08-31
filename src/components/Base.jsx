import React, { PureComponent } from 'react';
import styled from 'styled-components';

const BaseWrapper = styled.div`
	height: 100%;
	width: 100%;
	background: #fff;
	margin-top: 5px;
`;

export default class Base extends PureComponent {
	render() {
		return <BaseWrapper />;
	}
}
