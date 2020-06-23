import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import { initSoundCloudApi } from './api/soundcloud';
import { App } from './App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import { Environments } from './typings/environments';

// set up redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// environment variables
const APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const APP_ENVIRONMENT = process.env.REACT_APP_APP_ENV as Environments;

// supply SoundCloud SDK with API client ID
initSoundCloudApi({
  client_id: APP_CLIENT_ID,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App env={APP_ENVIRONMENT} clientId={APP_CLIENT_ID} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
