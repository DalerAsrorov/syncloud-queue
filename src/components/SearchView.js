// @flow

import React from 'react';
import styled from 'styled-components';
import Search from '../containers/Search';
import SearchResults from '../containers/SearchResults';

const SearchViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SearchWrapper = styled.div`flex: 50px 0;`;

const SearchResultsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    border-radius: 0 !important;
    border: 1px solid #ddd;
    margin-top: 5px;
`;

const SearchView = (props: {
    results: Array<Object>,
    onLoaderShow: Function,
    onSearchStart: Function,
    isLoading: boolean
}) => (
    <SearchViewWrapper>
        <SearchWrapper>
            <Search onSearchStart={props.onSearchStart} onLoaderShow={props.onLoaderShow} />
        </SearchWrapper>
        <SearchResultsWrapper>
            <SearchResults results={props.results} isLoading={props.isLoading} />
        </SearchResultsWrapper>
    </SearchViewWrapper>
);

export default SearchView;