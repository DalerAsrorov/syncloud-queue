import { APIParams, APISearchParams, SoundCloudSDK } from './SC';

declare global {
  interface Window {
    SC: SoundCloudSDK;
  }
}

export const SC = () => window.SC;

export const initSoundCloudApi = async (params: APIParams) =>
  await SC().initialize(params);

export const searchTracksApi = async (params: APISearchParams) =>
  await SC().get('/tracks', {
    ...params,
  });
