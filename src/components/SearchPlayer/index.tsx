import React from 'react';
import { PlayerView, SearchPlayerViewProps } from './PlayerView';

export interface SearchPlayerProps extends SearchPlayerViewProps {}
export interface SearchPlayerState {
  isReady: boolean;
}

const SearchPlayer = (props: SearchPlayerViewProps) => {
  const [state, setState] = React.useState<SearchPlayerState>({
    isReady: false,
  });

  return (
    <PlayerView
      onReady={() => {
        setState({ isReady: true });
      }}
      isReady={state.isReady}
      {...props}
    />
  );
};

export default SearchPlayer;
