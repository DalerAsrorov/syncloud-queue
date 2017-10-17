// @flow

import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 100%;
    padding: 5px;
    font-size: 28px;
    border-radius: 0;
    border-radius: 0 !important;
    border-width: 1px;
    border-style: groove;
    transition: box-shadow 0.15s ease;

    &:hover {
        box-shadow: 0 0 13px #e49a53;
        border-style: groove;
        border-color: #ffe4c9;
    }

    &:focus {
        outline: 1px solid #e49a53;
    }
`;

const SearchFormWrapper = styled.form`display: flex;`;

const SearchForm = (props: { onSubmit: Function, onChange: Function }) => {
    const { onSubmit, onChange } = props;

    return (
        <SearchFormWrapper onSubmit={onSubmit}>
            <SearchInput onChange={onChange} placeholder="Search artists, playlists, tracks..." name="search" />
        </SearchFormWrapper>
    );
};

export default SearchForm;
