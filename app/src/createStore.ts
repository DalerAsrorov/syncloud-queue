import { action, computed, observable } from 'mobx';
import { searchTracksApi } from './api/soundcloud';
import { APISearchParams, Track } from './typings/SC';
import { SearchQueryType } from './utils/search-options';

export interface App {
  currentTrackId: Track['id'] | null;
  query: string;
  nextRef: string | undefined | null;
  queryTracklist: Track[];
  myTracklst: Track[];
  isQueryTracklistEmpty: boolean;
  isMyTracklistEmpty: boolean;
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
  @observable currentTrackId: App['currentTrackId'] = null;
  @observable query: App['query'] = '';
  @observable nextRef: App['nextRef'] = null;
  @observable queryTracklist: App['queryTracklist'] = [];
  @observable myTracklst: App['myTracklst'] = [];
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
    return this.myTracklst.length;
  }

  @computed
  get isMyTracklistEmpty(): App['isMyTracklistEmpty'] {
    return this.myTracklst.length === 0;
  }

  @computed get filteredSearchList(): Track[] {
    return this.queryTracklist.filter(
      (track) => !this.myTracklst.find((myTrack) => myTrack.id === track.id)
    );
  }

  @computed get currentTrack(): { track: Track; index: number } | undefined {
    let index: number = 0;
    let track: Track | null = null;

    for (let i = 0; i < this.myTracklst.length; i++) {
      if (this.myTracklst[i].id === this.currentTrackId) {
        track = this.myTracklst[i];
        index = i;
        break;
      }
    }

    return track ? { track, index } : undefined;
  }

  @action setSearchQuery(query: string): void {
    this.query = query;
  }

  @action setCurrentTrack(id: Track['id'] | null): void {
    this.currentTrackId = id;
  }

  @action prevClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    // happy path
    if (currTrackIndex !== undefined && currTrackIndex !== 0) {
      const prevTrack = this.myTracklst[currTrackIndex - 1];

      this.setCurrentTrack(prevTrack.id);
    }
  }

  @action nextClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    if (
      currTrackIndex !== undefined &&
      currTrackIndex + 1 < this.myTracklistNTotal
    ) {
      const nextTrack = this.myTracklst[currTrackIndex + 1];

      this.setCurrentTrack(nextTrack.id);
    }
  }

  @action addTrackToQueue(newTrack: Track): void {
    if (this.currentTrackId === null) {
      this.setCurrentTrack(newTrack.id);
    }
    this.myTracklst.push(newTrack);
  }

  @action deleteTrackFromQueue(deleteTrackId: Track['id']): void {
    const removeIndex = this.myTracklst
      .map((track) => track.id)
      .indexOf(deleteTrackId);

    this.myTracklst.splice(removeIndex, 1);
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
