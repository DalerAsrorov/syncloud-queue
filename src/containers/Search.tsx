import { connect } from 'react-redux';
import { Search } from '../components/Search';
import {
  mapSearchDispatchToProps,
  mapSearchStateToProps,
} from '../reducers/search';

export const ConnectedSearch = connect<any, any, any>(
  mapSearchStateToProps,
  mapSearchDispatchToProps
)(Search);
