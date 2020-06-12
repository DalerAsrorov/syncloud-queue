import { SoundCloudSDK, APIParams } from './SC';

declare global {
  interface Window {
    SC: SoundCloudSDK;
  }
}

export const initSoundCloudApi = async (params: APIParams) =>
  await SC().initialize(params);

export const SC = () => window.SC;
