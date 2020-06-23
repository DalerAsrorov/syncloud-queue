import { connect } from 'react-redux';
import { ListOfTracks } from '../components/ListOfTracks';
import {
  mapDispatchSearchToProps,
  mapSearchPlayerStateToProps,
} from '../reducers/search-players';

export const ConnectedListOfTracks = connect<any, any, any>(
  mapSearchPlayerStateToProps,
  mapDispatchSearchToProps
)(ListOfTracks);
