import { action, computed, observable } from 'mobx';
import { Track, APISearchParams } from './api/SC';
import { searchTracksApi } from './api/soundcloud';

export interface App {
  queryTrackist: Track[];
  isQueryTracklistEmpty: boolean;
  myTracklist: Track[];
  isRequestingQueryTracks: boolean;
  limit: number;
  offset: number;
  queryTracklistNTotal: number;
  myTracklistNTotal: number;
}

export const SEARCH_QUERY_TRACKS_LIMIT = 20;

export const createStore = () => new AppLocalStore();

export class AppLocalStore {
  @observable queryTracklist: App['queryTrackist'] = [];
  @observable myTracklist: App['myTracklist'] = [];
  @observable
  isRequestingQueryTracks: App['isRequestingQueryTracks'] = false;
  @observable limit: App['limit'] = SEARCH_QUERY_TRACKS_LIMIT;
  @observable offset: App['offset'] = 0;

  @computed
  get queryTracklistNTotal(): App['queryTracklistNTotal'] {
    return this.queryTracklist.length;
  }

  @computed
  get isQueryTracklistEmpty(): App['isQueryTracklistEmpty'] {
    return this.queryTracklist.length === 0;
  }

  @computed
  get myTracklistNTotal(): App['myTracklistNTotal'] {
    return this.myTracklist.length;
  }

  @action
  fetchSearchedTracks(params: APISearchParams) {
    this.isRequestingQueryTracks = true;
    searchTracksApi(params).then((searchPayload) => {
      this.queryTracklist.push(...searchPayload.collection);
      this.isRequestingQueryTracks = false;
    });
  }

  @action
  clearSearchData() {
    this.queryTracklist = [];
    this.offset = 0;
    this.isRequestingQueryTracks = false;
  }
}

export type AppStore = ReturnType<typeof createStore>;
