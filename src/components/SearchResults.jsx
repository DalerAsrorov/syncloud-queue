import React from 'react';
import styled from 'styled-components';

const SearchResults = (props: { results: Array<Object> }) => (
	<h3> Search results will be shown here {JSON.stringify(props.results)} </h3>
);
export default SearchResults;
