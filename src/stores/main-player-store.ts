import { action, computed, observable } from 'mobx';
import { Track } from '../typings/SC';
import { CurrentTrack } from '../typings/utils';

export interface IMainPlayerStore {
  currentTrackId: Track['id'] | null;
  tracklist: Track[];
  // computed
  numberOfTracks: number;
  isTracklistEmpty: boolean;
}

export class MainPlayerStore {
  @observable currentTrackId: IMainPlayerStore['currentTrackId'] = null;
  @observable tracklist: IMainPlayerStore['tracklist'] = [];

  public rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @computed get currentTrack(): CurrentTrack | undefined {
    let index: number = 0;
    let track: Track | null = null;

    for (let i = 0; i < this.tracklist.length; i++) {
      if (this.tracklist[i].id === this.currentTrackId) {
        track = this.tracklist[i];
        index = i;
        break;
      }
    }

    return track ? { track, index } : undefined;
  }

  @computed
  get numberOfTracks(): IMainPlayerStore['numberOfTracks'] {
    return this.tracklist.length;
  }

  @computed
  get isTracklistEmpty(): IMainPlayerStore['isTracklistEmpty'] {
    return this.tracklist.length === 0;
  }

  @action addTrackToQueue(newTrack: Track): void {
    if (this.currentTrackId === null) {
      this.setCurrentTrack(newTrack.id);
    }
    this.tracklist.push(newTrack);
  }

  @action setCurrentTrack(id: Track['id'] | null): void {
    this.currentTrackId = id;
  }

  @action prevClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    // happy path
    if (currTrackIndex !== undefined && currTrackIndex !== 0) {
      const prevTrack = this.tracklist[currTrackIndex - 1];

      this.setCurrentTrack(prevTrack.id);
    }
  }

  @action nextClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    if (
      currTrackIndex !== undefined &&
      currTrackIndex + 1 < this.numberOfTracks
    ) {
      const nextTrack = this.tracklist[currTrackIndex + 1];

      this.setCurrentTrack(nextTrack.id);
    }
  }

  @action deleteTrackFromQueue(deleteTrackId: Track['id']): void {
    const removeIndex = this.tracklist
      .map((track) => track.id)
      .indexOf(deleteTrackId);

    this.tracklist.splice(removeIndex, 1);
  }
}
