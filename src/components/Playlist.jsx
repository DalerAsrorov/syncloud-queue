// @flow

import React from 'react';
import styled from 'styled-components';

const PlaylistWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
`;

const Playlist = (props: { tracks: Array<Object> }) => (
	<PlaylistWrapper>
		<code>
			<pre>{JSON.stringify(props.tracks, 4, 4)}</pre>
		</code>
	</PlaylistWrapper>
);

export default Playlist;
