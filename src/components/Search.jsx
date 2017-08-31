import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class Search extends PureComponent {
	render() {
		const { onSearchStart } = this.props;
		console.log(onSearchStart);
		return <h3> Search form input will be shown here </h3>;
	}
}
