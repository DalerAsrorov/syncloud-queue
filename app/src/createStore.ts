export interface Track {}

export interface App {
  queryTrackist: Track[];
  isQueryTracklistEmpty: boolean;
  myTracklist: Track[];
  isQueryingTracks: boolean;
  limit: number;
  offset: number;
  queryTracklistNTotal: number;
  myTracklistNTotal: number;
}

export function createStore() {
  return {
    queryTracklist: [] as App['queryTrackist'],
    myTracklist: [] as App['myTracklist'],
    isQueryingTracks: false as App['isQueryingTracks'],
    limit: 0 as App['limit'],
    offset: 0 as App['offset'],
    get queryTracklistNTotal(): App['queryTracklistNTotal'] {
      return this.queryTracklist.length;
    },
    get isQueryTracklistEmpty(): App['isQueryTracklistEmpty'] {
      return this.queryTracklist.length === 0;
    },
    get myTracklistNTotal(): App['myTracklistNTotal'] {
      return this.myTracklist.length;
    },
  };
}

export type AppStore = ReturnType<typeof createStore>;
