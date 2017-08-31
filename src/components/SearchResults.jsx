import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class SearchResults extends PureComponent {
	render() {
		const { results } = this.props;
		console.log(results);

		return <h3> Search results will be shown here </h3>;
	}
}
