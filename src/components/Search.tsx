import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import {
  Dropdown,
  DropdownProps,
  Form,
  Input,
  InputProps,
} from 'semantic-ui-react';
import { useStore } from '../store-context';
import { SearchQueryType, SEARCH_OPTIONS } from '../utils/search-options';

export interface SearchProps extends InputProps {}

export const Search: React.FC<SearchProps> = observer((props) => {
  const store = useStore();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    store.setSearchQuery(event.target.value);
  };

  const handleQueryTypeChange = (
    _event: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    store.queryType = value as SearchQueryType;
  };

  const handleSubmit = () => {
    store.clearSearchData();
    store.fetchSearchedTracks({
      limit: store.limit,
      linked_partitioning: 1,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        loading={store.isRequestingQueryTracks}
        action={
          <Dropdown
            button
            id={`dropdown-${store.queryType}`}
            options={SEARCH_OPTIONS}
            value={store.queryType}
            onChange={handleQueryTypeChange}
          />
        }
        onChange={handleInput}
        iconPosition="left"
        size="huge"
        fluid
        icon="search"
        placeholder="Search..."
        value={store.query}
        {...props}
      />
    </Form>
  );
});
