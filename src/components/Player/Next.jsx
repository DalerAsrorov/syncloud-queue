// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NextButton } from 'react-soundplayer/components';

type Props = {
    color: string,
    onNextTrack: Function,
    nextTrackID: number
};

const NextWrapper = styled.button`
    cursor: pointer;
    height: 100%;
    width: 18px;
    color: ${props => props.color} !important;
`;

class Next extends PureComponent<Props, {}> {
    _handleClickNext = (event: SyntheticInputEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.props.onNextTrack(this.props.nextTrackID);
    };

    render() {
        return (
            <NextWrapper onClick={this._handleClickNext} {...this.props}>
                next
            </NextWrapper>
        );
    }
}

export default Next;
