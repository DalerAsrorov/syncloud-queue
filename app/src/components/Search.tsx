import React, { useState, ChangeEvent } from 'react';
import { Form, Input, InputProps } from 'semantic-ui-react';

export interface SearchProps extends InputProps {}
export type SearchState = string;

export const Search: React.FC<SearchProps> = (props) => {
  const [queryInput, setInputState] = useState<SearchState>('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Final result: ${queryInput}`);
  };

  console.log(queryInput);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={handleInput}
        size="huge"
        fluid
        icon="search"
        placeholder="Search..."
        {...props}
      />
    </Form>
  );
};
