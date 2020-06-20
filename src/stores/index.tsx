import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import React from 'react';
import { RootStore } from './root-store';

configure({ enforceActions: 'observed' });

export enum StoreKeys {
  Root = 'rootStore',
  QueryStore = 'queryStore',
  MainPlayer = 'mainPlayerStore',
  MyTracklistStore = 'myTracklistStore',
}

const rootStore = new RootStore();
const stores: { [key in StoreKeys]: any } = {
  [StoreKeys.Root]: rootStore,
  [StoreKeys.QueryStore]: rootStore.queryStore,
  [StoreKeys.MainPlayer]: rootStore.mainPlayerStore,
  [StoreKeys.MyTracklistStore]: rootStore.myTracklistStore,
};

export const StoreProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return <Provider {...stores}>{children}</Provider>;
};
