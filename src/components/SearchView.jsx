// @flow

import React from 'react';
import styled from 'styled-components';
import styledClassNames from 'styled-classnames';
import Search from '../containers/Search';
import SearchResults from './SearchResultsView';

const SearchViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SearchWrapper = styled.div`flex: 50px 0;`;

const searchResultsWrapperClass = styledClassNames`
    display: flex;
    flex: 1;
    height: 100%;
    border-radius: 0 !important;
    border: 1px solid #ddd;
    margin-top: 5px;
`;

const SearchResultsWrapper = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    border-radius: 0 !important;
    border: 1px solid #ddd;
    margin-top: 5px;
`;

const SearchView = (props: { onSearchStart: Function, results: Array<Object> }) => (
    <SearchViewWrapper>
        <SearchWrapper>
            <Search onSearchStart={props.onSearchStart} />
        </SearchWrapper>
        <SearchResultsWrapper>
            <SearchResults results={props.results} />
        </SearchResultsWrapper>
    </SearchViewWrapper>
);

export default SearchView;
