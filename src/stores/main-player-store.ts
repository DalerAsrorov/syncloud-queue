import { action, computed, observable, toJS } from 'mobx';
import { EnhancedTrack, Track } from '../typings/SC';
import { CurrentTrack } from '../typings/utils';

export interface IMainPlayerStore {
  currentTrack: CurrentTrack | null;
  tracklist: EnhancedTrack[];
  // computed
  numberOfTracks: number;
  isTracklistEmpty: boolean;
}

export class MainPlayerStore {
  @observable currentTrack: IMainPlayerStore['currentTrack'] = null;
  @observable tracklist: IMainPlayerStore['tracklist'] = [];

  public rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @computed
  get numberOfTracks(): IMainPlayerStore['numberOfTracks'] {
    return this.tracklist.length;
  }

  @computed
  get isTracklistEmpty(): IMainPlayerStore['isTracklistEmpty'] {
    return this.tracklist.length === 0;
  }

  @action addTrackToQueue(track: Track): void {
    const newTrack = { ...track, isReady: false };

    this.tracklist = [...this.tracklist, newTrack];

    if (this.tracklist.length === 1) {
      this.setCurrentTrack(newTrack, 0);
    }
  }

  @action setCurrentTrack(track: EnhancedTrack, index: number): void {
    this.currentTrack = toJS({ track: track, index });
  }

  @action prevClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    if (currTrackIndex !== undefined && currTrackIndex !== 0) {
      const prevIndex = currTrackIndex - 1;
      const prevTrack = this.tracklist[prevIndex];

      this.setCurrentTrack(prevTrack, prevIndex);
    }
  }

  @action nextClick(): void {
    const currTrackIndex = this.currentTrack?.index;

    if (
      currTrackIndex !== undefined &&
      currTrackIndex < this.numberOfTracks - 1
    ) {
      const nextIndex = currTrackIndex + 1;
      const nextTrack = this.tracklist[nextIndex];

      this.setCurrentTrack(nextTrack, nextIndex);
    }
  }

  @action deleteTrackFromQueue(deleteTrackId: EnhancedTrack['id']): void {
    const removeIndex = this.tracklist
      .map((track) => track.id)
      .indexOf(deleteTrackId);

    this.tracklist.splice(removeIndex, 1);
  }

  @action setCurrentTrackAsReady(trackId: Track['id'], isReady: boolean) {
    const foundIndex = this.tracklist.map((track) => track.id).indexOf(trackId);

    this.tracklist[foundIndex].isReady = isReady;
  }
}
