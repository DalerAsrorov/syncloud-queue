import React from 'react';
import { configure } from 'mobx';
import { RootStore } from './root-store';
import { Provider } from 'mobx-react';

configure({ enforceActions: 'observed' });

export enum StoreKeys {
  Root = 'rootStore',
  QueryStore = 'queryStore',
  MainPlayer = 'mainPlayerStore',
}

const rootStore = new RootStore();
const stores = {
  [StoreKeys.Root]: rootStore,
  [StoreKeys.QueryStore]: rootStore.queryStore,
  [StoreKeys.MainPlayer]: rootStore.mainPlayerStore,
};

export const StoreProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return <Provider {...stores}>{children}</Provider>;
};
