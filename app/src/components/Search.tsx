import { observer } from 'mobx-react';
import React, { ChangeEvent, useState } from 'react';
import { Form, Input, InputProps } from 'semantic-ui-react';
import { useStore } from '../store-context';

export interface SearchProps extends InputProps {}
export type SearchState = string;

export const Search: React.FC<SearchProps> = observer((props) => {
  const [queryInput, setInputState] = useState<SearchState>('');
  const store = useStore();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const handleSubmit = () => {
    store.clearSearchData();
    store.fetchSearchedTracks({
      q: queryInput.trim(),
      limit: store.limit,
      offset: store.offset + store.limit,
      linked_partitioning: 1,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        loading={store.isRequestingQueryTracks}
        onChange={handleInput}
        size="huge"
        fluid
        icon="search"
        placeholder="Search..."
        {...props}
      />
    </Form>
  );
});
