import { action, computed, observable } from 'mobx';
import { Track, APISearchParams } from './api/SC';
import { searchTracksApi } from './api/soundcloud';

export interface App {
  queryTracklistMap: { [id: string]: Track };
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
  @observable queryTracklistMap: App['queryTracklistMap'] = {};
  @observable myTracklist: App['myTracklist'] = [];
  @observable
  isRequestingQueryTracks: App['isRequestingQueryTracks'] = false;
  @observable limit: App['limit'] = SEARCH_QUERY_TRACKS_LIMIT;
  @observable offset: App['offset'] = 0;

  @computed
  get queryTracklistNTotal(): App['queryTracklistNTotal'] {
    return Object.keys(this.queryTracklistMap).length;
  }

  @computed
  get isQueryTracklistEmpty(): App['isQueryTracklistEmpty'] {
    return Object.keys(this.queryTracklistMap).length === 0;
  }

  @computed
  get myTracklistNTotal(): App['myTracklistNTotal'] {
    return this.myTracklist.length;
  }

  @computed
  get searchTracklist(): Track[] {
    return Object.values(this.queryTracklistMap);
  }

  @action
  fetchSearchedTracks(params: APISearchParams) {
    this.isRequestingQueryTracks = true;

    searchTracksApi(params).then((searchPayload) => {
      const newTracksMap = searchPayload.collection.reduce(
        (prev, currTrack) => {
          const { id, ...restTrackProps } = currTrack;

          return {
            ...prev,
            [id]: { id, ...restTrackProps },
          };
        },
        {} as App['queryTracklistMap']
      );

      this.queryTracklistMap = {
        ...this.queryTracklistMap,
        ...newTracksMap,
      };
      this.isRequestingQueryTracks = false;
    });
  }

  @action
  clearSearchData() {
    this.queryTracklistMap = {};
    this.offset = 0;
    this.isRequestingQueryTracks = false;
  }
}

export type AppStore = ReturnType<typeof createStore>;
