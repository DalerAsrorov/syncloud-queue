import { inject, observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import {
  Dropdown,
  DropdownProps,
  Form,
  Input,
  InputProps,
} from 'semantic-ui-react';
import { StoreKeys } from '../stores/index';
import { QueryStore } from '../stores/query-store';
import { SearchQueryType, SEARCH_OPTIONS } from '../utils/search-options';

export interface SearchProps extends InputProps {
  queryStore?: QueryStore;
}

export const Search: React.FC<SearchProps> = inject(StoreKeys.QueryStore)(
  observer((props) => {
    const { queryStore, ...restProps } = props;

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      queryStore!.setSearchQuery(event.target.value);
    };

    const handleQueryTypeChange = (
      _event: React.SyntheticEvent<HTMLElement>,
      { value }: DropdownProps
    ) => {
      queryStore!.setQueryType(value as SearchQueryType);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      queryStore!.fetchSearchedTracks({
        limit: queryStore!.limit,
        linked_partitioning: 1,
      });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          loading={queryStore!.isLoading}
          action={
            <Dropdown
              button
              id={`dropdown-${queryStore!.queryType}`}
              options={SEARCH_OPTIONS}
              value={queryStore!.queryType}
              onChange={handleQueryTypeChange}
            />
          }
          onChange={handleInput}
          iconPosition="left"
          size="huge"
          fluid
          icon="search"
          placeholder="Search..."
          value={queryStore!.query}
          {...restProps}
        />
      </Form>
    );
  })
);
