import { MainPlayerStore } from './main-player-store';
import { QueryStore } from './query-store';
import { MyTracklistStore } from './tracklist-store';

export class RootStore {
  public mainPlayerStore: MainPlayerStore;
  public queryStore: QueryStore;
  public myTracklistStore: MyTracklistStore;

  constructor() {
    this.queryStore = new QueryStore(this);
    this.mainPlayerStore = new MainPlayerStore(this);
    this.myTracklistStore = new MyTracklistStore(this);
  }
}
