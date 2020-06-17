import { IMainPlayerStore, MainPlayerStore } from './main-player-store';
import { IQueryStore, QueryStore } from './query-store';

export class RootStore {
  public mainPlayerStore: IMainPlayerStore;
  public queryStore: IQueryStore;

  constructor() {
    this.mainPlayerStore = new MainPlayerStore(this);
    this.queryStore = new QueryStore(this);
  }
}
