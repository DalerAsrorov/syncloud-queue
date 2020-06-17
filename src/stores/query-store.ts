import { action, computed, observable } from 'mobx';
import { SEARCH_QUERY_TRACKS_LIMIT } from '../api/constants';
import { searchTracksApi } from '../api/soundcloud';
import { APISearchParams, NextHref, Track } from '../typings/SC';
import { SearchQueryType } from '../utils/search-options';
import { RootStore } from './root-store';

export interface IQueryStore {
  query: string;
  nextRef: string | undefined | null;
  tracklist: Track[];
  queryType: SearchQueryType;
  isLoading: boolean;
  limit: number;
  offset: number;
  // computed
  numberOfTracks: number;
  isTracklistEmpty: boolean;
}

export class QueryStore {
  @observable query: IQueryStore['query'] = '';
  @observable nextRef: IQueryStore['nextRef'] = null;
  @observable tracklist: IQueryStore['tracklist'] = [];
  @observable queryType: IQueryStore['queryType'] = SearchQueryType.Q;
  @observable isLoading: IQueryStore['isLoading'] = false;
  @observable limit: IQueryStore['limit'] = SEARCH_QUERY_TRACKS_LIMIT;
  @observable offset: IQueryStore['offset'] = 0;

  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get numberOfTracks(): IQueryStore['numberOfTracks'] {
    return this.tracklist.length;
  }

  @computed
  get isTracklistEmpty(): IQueryStore['isTracklistEmpty'] {
    return this.tracklist.length === 0;
  }

  @computed get filteredSearchList(): Track[] {
    return this.rootStore.queryStore.tracklist.filter(
      (track: Track) =>
        !this.rootStore.mainPlayerStore.tracklist.find(
          (myTrack) => myTrack.id === track.id
        )
    );
  }

  @action setSearchQuery(query: string): void {
    this.query = query;
  }

  @action
  fetchSearchedTracks(
    params: APISearchParams,
    isFetchMoreRequest: boolean = false
  ): void {
    const isOutOfTracks = isFetchMoreRequest && !this.nextRef;

    if (!isOutOfTracks) {
      this.setRequestTracksStatus(true);

      if (!isFetchMoreRequest) {
        this.offset = 0;
        this.tracklist = [];
      }

      searchTracksApi({
        ...params,
        offset: this.offset,
        [this.queryType]: this.query.trim(),
      }).then((searchPayload) => {
        const { collection, next_href } = searchPayload;
        const nextTracks = collection.map((currTrack) => {
          const artwork_url = currTrack.artwork_url
            ? currTrack.artwork_url
            : currTrack.user.avatar_url;

          return {
            ...currTrack,
            artwork_url,
          };
        });

        this.updateRequestOffset(params);
        this.setNextTrackListState({ nextHref: next_href, tracks: nextTracks });
        this.setRequestTracksStatus(false);
      });
    }
  }

  @action setQueryType(queryType: IQueryStore['queryType']) {
    this.queryType = queryType;
  }

  @action updateRequestOffset(params: APISearchParams) {
    this.offset += params.limit ? params.limit : SEARCH_QUERY_TRACKS_LIMIT;
  }

  @action setNextTrackListState({
    nextHref,
    tracks,
  }: {
    nextHref: NextHref;
    tracks: Track[];
  }) {
    this.nextRef = nextHref;
    this.tracklist = [...this.tracklist, ...tracks];
  }

  @action setRequestTracksStatus(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
