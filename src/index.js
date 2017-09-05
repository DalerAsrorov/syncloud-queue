import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// imports to remove
import { addTrack, deleteTrack } from './actionCreators';

let [tempTrack1, tempTrack2, tempTrack3] = [
    {
        id: 1,
        title: 'Green Day',
        username: 'baby'
    },
    {
        id: 2,
        title: 'The Beatles',
        username: 'dolla'
    },
    {
        id: 3,
        title: 'The Dogs',
        username: 'bita mita'
    }
];

console.log('Initial state', store.getState());
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions

// Add tracks
store.dispatch(addTrack(tempTrack1));
store.dispatch(addTrack(tempTrack2));
store.dispatch(addTrack(tempTrack3));

// Delete tracks
console.log('deleting tracks...');
store.dispatch(deleteTrack(tempTrack2.id));
store.dispatch(deleteTrack(tempTrack3.id));
store.dispatch(addTrack(tempTrack3));
store.dispatch(addTrack(tempTrack2));
store.dispatch(deleteTrack(tempTrack1.id));

// Stop listening to state updates
unsubscribe();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
