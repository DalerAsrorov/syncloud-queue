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
- https://github.com/troybetz/react-soundcloud-widget - React widget component
- https://developers.soundcloud.com/docs/api/guide#search
- https://developers.soundcloud.com/docs/api/reference#tracks

## TODO: 

- (*) Make sure the loader component goes away after all tracks are ready to play 
    - (Current solution is a timeout - not good)
- Make "Next" button transition faster. It is slow because of (*)
- If the user is searching artists fast, there is an error that is due 
  to state being changed before all tracks are resolved. 
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
