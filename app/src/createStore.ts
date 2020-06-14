import { action, computed, observable } from 'mobx';
import { APISearchParams, Track } from './api/SC';
import { searchTracksApi } from './api/soundcloud';
import { SearchQueryType } from './utils/search-options';

export interface App {
  query: string;
  nextRef: string | undefined | null;
  queryTracklistMap: { [id: string]: Track };
  myTracklistMap: { [id: string]: Track };
  isQueryTracklistEmpty: boolean;
  queryType: SearchQueryType;
  isRequestingQueryTracks: boolean;
  limit: number;
  offset: number;
  queryTracklistNTotal: number;
  myTracklistNTotal: number;
}

export const SEARCH_QUERY_TRACKS_LIMIT = 40;

export const createStore = () => new AppLocalStore();

export class AppLocalStore {
  @observable query: App['query'] = '';
  @observable nextRef: App['nextRef'] = null;
  @observable queryTracklistMap: App['queryTracklistMap'] = {};
  @observable myTracklistMap: App['myTracklistMap'] = {};
  @observable queryType: App['queryType'] = SearchQueryType.Q;
  @observable lastSavedQueryType: App['queryType'] = this.queryType;
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
    return Object.keys(this.myTracklistMap).length;
  }

  @computed
  get searchTracklistAsList(): Track[] {
    return Object.values(this.queryTracklistMap);
  }

  @computed
  get myTrackListAsList(): Track[] {
    return Object.values(this.myTracklistMap);
  }

  @action setSearchQuery(query: string): void {
    this.query = query;
  }

  @action addTrackToQueue(newTrack: Track): void {
    this.myTracklistMap = {
      [newTrack.id]: {
        ...newTrack,
      },
      ...this.myTracklistMap,
    };
  }

  @action deleteTrackFromQueue(deleteTrackId: Track['id']): void {
    delete this.myTracklistMap[deleteTrackId];
  }

  @action
  fetchSearchedTracks(
    params: APISearchParams,
    isFetchMoreRequest: boolean = false
  ): void {
    const prevOffset = this.offset;
    const isOutOfTracks = isFetchMoreRequest && !this.nextRef;
    this.isRequestingQueryTracks = true;
    this.offset += params.limit ? params.limit : SEARCH_QUERY_TRACKS_LIMIT;

    if (!isOutOfTracks) {
      let queryType = this.queryType;

      if (!isFetchMoreRequest) {
        this.lastSavedQueryType = queryType;
      } else {
        queryType = this.lastSavedQueryType;
      }

      searchTracksApi({
        ...params,
        offset: prevOffset,
        [this.queryType]: this.query.trim(),
      }).then((searchPayload) => {
        const { collection, next_href } = searchPayload;
        const newTracksMap = collection.reduce((prev, currTrack) => {
          const artwork_url = currTrack.artwork_url
            ? currTrack.artwork_url
            : currTrack.user.avatar_url;

          return {
            ...prev,
            [currTrack.id]: {
              ...currTrack,
              artwork_url,
            },
          };
        }, {} as App['queryTracklistMap']);

        this.nextRef = next_href;
        this.queryTracklistMap = {
          ...this.queryTracklistMap,
          ...newTracksMap,
        };
        this.isRequestingQueryTracks = false;
      });
    } else {
      this.isRequestingQueryTracks = false;
    }
  }

  @action
  clearSearchData() {
    this.queryTracklistMap = {};
    this.offset = 0;
    this.isRequestingQueryTracks = false;
  }
}

export type AppStore = ReturnType<typeof createStore>;
