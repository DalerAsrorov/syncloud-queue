import React from 'react';
import ReactDOM from 'react-dom';
import { initSoundCloudApi } from './api/soundcloud';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store-context';

import 'semantic-ui-css/semantic.min.css';

const APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';

initSoundCloudApi({
  client_id: APP_CLIENT_ID,
});

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App clientId={APP_CLIENT_ID} />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
