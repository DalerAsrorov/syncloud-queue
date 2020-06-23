import React, { ChangeEvent } from 'react';
import { Dropdown, DropdownProps, Form, Input } from 'semantic-ui-react';
import { RootState } from '../reducers/index';
import { MappedSearchDispatch } from '../reducers/search';
import {
  MappedSearchPlayerProps,
  MappedSearchPlayerDispatch,
} from '../reducers/search-players';
import { SearchQueryType, SEARCH_OPTIONS } from '../utils/search-options';

export interface SearchProps
  extends RootState,
    MappedSearchPlayerProps,
    MappedSearchPlayerDispatch,
    MappedSearchDispatch {}

export const Search: React.FC<SearchProps> = (props) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    props.onSetQueryValue(event.target.value);
  };

  const handleQueryTypeChange = (
    _event: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    props.onSetQueryType(value as SearchQueryType);
  };

  console.log(
    'props.search.query:::',
    props.search.query,
    'type:',
    props.search.queryType
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.onFetch({
      limit: props.searchPlayer.limit,
      linked_partitioning: 1,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        loading={props.searchPlayer.isLoading}
        onChange={handleInput}
        value={props.search.query}
        action={
          <Dropdown
            button
            id={`dropdown-${props.search.queryType}`}
            options={SEARCH_OPTIONS}
            value={props.search.queryType}
            onChange={handleQueryTypeChange}
          />
        }
        iconPosition="left"
        size="huge"
        icon="search"
        placeholder="Search..."
        fluid
      />
    </Form>
  );
};
