import React from 'react';
import styled from 'styled-components';

const Playlist = (props: { tracks: Array<Object> }) => <h3>{JSON.stringify(props.tracks)}</h3>;

export default Playlist;
