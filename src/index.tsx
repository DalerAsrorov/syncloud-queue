import React from 'react';
import ReactDOM from 'react-dom';
import { initSoundCloudApi } from './api/soundcloud';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store-context';
import { Env, Environments } from './typings/environments';

import 'mobx-react-lite/batchingForReactDom';

import 'semantic-ui-css/semantic.min.css';

const APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const APP_ENVIRONMENT = process.env.REACT_APP_APP_ENV as Environments;

initSoundCloudApi({
  client_id: APP_CLIENT_ID,
});

const AppContainer = (props: { env: Env; children: React.ReactElement }) =>
  APP_ENVIRONMENT === Environments.development ? (
    <>{props.children}</>
  ) : (
    <React.StrictMode>{props.children}</React.StrictMode>
  );

ReactDOM.render(
  <AppContainer env={APP_ENVIRONMENT}>
    <StoreProvider>
      <App clientId={APP_CLIENT_ID} />
    </StoreProvider>
  </AppContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
