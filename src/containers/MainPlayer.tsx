import { connect } from 'react-redux';
import { MainPlayer } from '../components/MainPlayer/index';
import {
  mapMainPlayerDispatchToProps,
  mapMainPlayerStateToProps,
} from '../reducers/main-player';

export const ConnectedMainPlayer = connect<any, any, any>(
  mapMainPlayerStateToProps,
  mapMainPlayerDispatchToProps
)(MainPlayer);
