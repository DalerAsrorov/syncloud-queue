import React from "react";
import { Input, InputProps } from "semantic-ui-react";

export interface SearchProps extends InputProps {}

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <Input size="huge" fluid icon="search" placeholder="Search..." {...props} />
  );
};
