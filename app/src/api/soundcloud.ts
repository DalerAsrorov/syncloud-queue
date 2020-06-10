import { SoundCloudSDK, APIParams } from './SC';

declare global {
  interface Window {
    SC: SoundCloudSDK;
  }
}

export const initSoundCloudApi = (params: APIParams) => {
  SC().initialize(params);
};

export const SC = () => window.SC;
