export interface Track {
  id: string;
  title: string;
  duration: number;
  user: {
    avatar_url: string;
    permalink_url: string;
    username: string;
  };
  soundCloudAudio: {
    _playlist: { tracks: Track[] };
    _playlistIndex?: number;
    _track: Track;
  };
  permalink_url?: string;
  artwork_url?: string;
  [key: string]: any;
}

export interface APIParams {
  client_id: string | undefined;
  redirect_uri?: string;
  stream_url?: string;
}

export interface APISearchParams {
  q?: string;
  license?: string;
  genres?: string;
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
  ) => Promise<{ collection: Track[]; next_href?: string | undefined }>;
}
