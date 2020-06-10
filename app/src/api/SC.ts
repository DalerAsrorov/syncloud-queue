export interface APIParams {
  client_id: string | undefined;
  redirect_uri?: string;
}

export interface SoundCloudSDK {
  initialize: (params: APIParams) => void;
}
