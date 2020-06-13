export interface Track {
  id: string;
  permalink_url?: string;
}

export interface APIParams {
  client_id: string | undefined;
  redirect_uri?: string;
  stream_url?: string;
}

export interface APISearchParams {
  q?: string;
  license?: string;
  duration?: string;
  tag_list?: string[];
  limit?: number;
  offset?: number;
  linked_partitioning?: number;
}

export interface SoundCloudSDK {
  initialize: (params: APIParams) => void;
  get: (
    path: string,
    params?: APISearchParams
  ) => Promise<{ collection: Track[]; href?: string }>;
}
