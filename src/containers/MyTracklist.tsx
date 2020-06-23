import { connect } from 'react-redux';
import { MyTracklist } from '../components/MyTracklist';
import {
  mapMainPlayerDispatchToProps,
  mapMainPlayerStateToProps,
} from '../reducers/main-player';

export const ConnectedMyTracklist = connect<any, any, any>(
  mapMainPlayerStateToProps,
  mapMainPlayerDispatchToProps
)(MyTracklist);
