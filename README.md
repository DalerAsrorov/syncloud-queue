[![Build Status](https://circleci.com/gh/DalerAsrorov/syncloud-queue.svg?style=shield&circle-token=8ae269e2e60d0a4c30a4a2fe207c148ba01fe117)](https://circleci.com/gh/DalerAsrorov/syncloud-queue)

<div>
    <a href="https://github.com/DalerAsrorov/syncloud-queue" target="__blank">
        <img height="200" width="300" src="src/images/syncloud.png"  />
    </a>
    <h1>SynCloud Queue</h1>
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

## Global state 
```javascript
{
    // an ID of the current song that is currently 
    // playing in the tracklist
    // DEFAULT: -1
    currentTrackPlayingID: number,
    
    // a global queue of tracks added by the user
    // DEFAULT: []
    tracklist: array
}
```

## License
* [MIT](LICENSE)