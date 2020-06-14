import { action, computed, observable } from 'mobx';
import { searchTracksApi } from './api/soundcloud';
import { EnhancedTrack } from './typings/common';
import { APISearchParams, Track } from './typings/SC';
import { SearchQueryType } from './utils/search-options';

export interface App {
  query: string;
  nextRef: string | undefined | null;
  queryTracklist: Track[];
  myTracklistMap: { [id: string]: EnhancedTrack };
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
  @observable queryTracklist: App['queryTracklist'] = [];
  @observable myTracklistMap: App['myTracklistMap'] = {};
  @observable queryType: App['queryType'] = SearchQueryType.Q;
  @observable lastSavedQueryType: App['queryType'] = this.queryType;
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
    return Object.keys(this.myTracklistMap).length;
  }

  @computed
  get myTrackListAsList(): Track[] {
    return Object.values(this.myTracklistMap).sort(
      (trackA, trackB) => trackA.index - trackB.index
    );
  }

  @computed get filteredSearchList(): Track[] {
    return this.queryTracklist.filter(
      (track) => !this.myTracklistMap[track.id]
    );
  }

  @action setSearchQuery(query: string): void {
    this.query = query;
  }

  @action addTrackToQueue(newTrack: Track): void {
    this.myTracklistMap = {
      [newTrack.id]: {
        index: Object.keys(this.myTracklistMap).length + 1,
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
        const newTracks = collection.map((currTrack) => {
          const artwork_url = currTrack.artwork_url
            ? currTrack.artwork_url
            : currTrack.user.avatar_url;

          return {
            ...currTrack,
            artwork_url,
          };
        });

        this.nextRef = next_href;
        this.queryTracklist = [...this.queryTracklist, ...newTracks];
        this.isRequestingQueryTracks = false;
      });
    } else {
      this.isRequestingQueryTracks = false;
    }
  }

  @action
  clearSearchData() {
    this.queryTracklist = [];
    this.offset = 0;
    this.isRequestingQueryTracks = false;
  }
}

export type AppStore = ReturnType<typeof createStore>;
