import { action, computed, observable } from 'mobx';
import { EnhancedTrack, Track } from '../typings/SC';

export interface IMyTracklistStore {
  tracklist: EnhancedTrack[];

  // computed
  numberOfTracks: number;
  isTracklistEmpty: boolean;
}

export class MyTracklistStore {
  @observable tracklist: IMyTracklistStore['tracklist'] = [];

  public rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @computed
  get numberOfTracks(): IMyTracklistStore['numberOfTracks'] {
    return this.tracklist.length;
  }

  @computed
  get isTracklistEmpty(): IMyTracklistStore['isTracklistEmpty'] {
    return this.tracklist.length === 0;
  }

  @action deleteTrackFromQueue(deleteTrackId: EnhancedTrack['id']): void {
    const removeIndex = this.tracklist
      .map((track) => track.id)
      .indexOf(deleteTrackId);

    this.tracklist.splice(removeIndex, 1);
  }

  @action addTrackToQueue(newTrack: Track): void {
    this.tracklist.push({ ...newTrack, isReady: false });
  }

  @action setTrackIsReady(
    trackId: EnhancedTrack['id'],
    isReady: boolean
  ): void {
    const trackIndex = this.tracklist.map((track) => track.id).indexOf(trackId);

    this.tracklist[trackIndex].isReady = isReady;
  }
}
