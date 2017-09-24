[![Build Status](https://circleci.com/gh/DalerAsrorov/syncloud-queue.svg?style=shield)]

<div>
    <a href="https://github.com/DalerAsrorov/syncloud-queue" target="__blank">
        <img height="200" width="300" src="src/images/syncloud.png"  />
    </a>
    <h1>SynCloud</h1>
</div>

Create your own tracklist by searching sounds that you like and adding them to your tracklist queue. You can set the playlist on `autoplay` mode and the tracks will play sequentially.

## Running locally 
1. `cd ./syncloud-queue`
1. `yarn` or `npm install`
1. `yarn start` or `npm run start`

## Useful links for development
- http://redux.js.org/ - Redux docs
- https://github.com/soundblogs/react-soundplayer - React widget component
- https://developers.soundcloud.com/docs/api/guide#search - SoundCloud API search query
- https://developers.soundcloud.com/docs/api/reference#tracks - Soundcloud API tracks attributes 

## TODO: 

- (*) Make sure the loader component goes away after all tracks are ready to play 
    - (Current solution is a timeout - not good)
- Make "Next" button transition faster. It is slow because of (*)
- If the user is searching artists fast, there is an error that is due 
  to state being changed before all tracks are resolved. 
- Currently, if the track gets deleted, it continues playing the track without 
  acknowledging the change of state. In this case, we should add a setNextTrack action
  after onDelete prop method which will set track to the next track in order. However, if 
  the queue is empty after the track deletion, set current track to -1 (default). 
- Add "reapeatTimes" feature 
    - User can increase number of times a song in a queue can be played before it's removed (pop).


## Global state 
```javascript
{
    // if true, the songs are played sequentially
    // in the order they were placed by the user
    // otherwise, play in repeat
    // DEFAULT: true
    autoplay: boolean,

    // an ID of the current song that is currently 
    // playing in the tracklist
    // DEFAULT: -1
    currentSongPlaying: number,
    
    // a global queue of tracks added by the user
    // DEFAULT: []
    tracklist: array
}
```
