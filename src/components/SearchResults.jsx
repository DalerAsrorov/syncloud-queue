import React from 'react';
import styled from 'styled-components';

const SearchResults = (props: { results: array }) => (
	<h3> Search results will be shown here {JSON.stringify(results)} </h3>
);
export default SearchResults;
