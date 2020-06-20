import { action, computed, observable } from 'mobx';
import { Track } from '../typings/SC';
import { CurrentTrack } from '../typings/utils';
import { RootStore } from './root-store';

export interface IMainPlayerStore {
  currentTrackId: Track['id'] | null;
}

export class MainPlayerStore {
  @observable currentTrackId: IMainPlayerStore['currentTrackId'] = null;

  public rootStore: RootStore;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @computed get currentTrack(): CurrentTrack | undefined {
    const { tracklist } = this.rootStore.myTracklistStore;
    let index: number = 0;
    let track: Track | null = null;

    for (let i = 0; i < this.rootStore.myTracklistStore.tracklist.length; i++) {
      if (tracklist[i].id === this.currentTrackId) {
        track = tracklist[i];
        index = i;
        break;
      }
    }

    return track ? { track, index } : undefined;
  }

  @action setCurrentTrack(id: Track['id'] | null): void {
    this.currentTrackId = id;
  }

  @action prevClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    // happy path
    if (currTrackIndex !== undefined && currTrackIndex !== 0) {
      const prevTrack = this.rootStore.myTracklistStore.tracklist[
        currTrackIndex - 1
      ];

      this.setCurrentTrack(prevTrack.id);
    }
  }

  @action nextClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    if (
      currTrackIndex !== undefined &&
      currTrackIndex + 1 < this.rootStore.myTracklistStore.numberOfTracks
    ) {
      const nextTrack = this.rootStore.myTracklistStore.tracklist[
        currTrackIndex + 1
      ];

      this.setCurrentTrack(nextTrack.id);
    }
  }
}
