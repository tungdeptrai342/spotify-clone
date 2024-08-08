import request from "../config/request";

interface ArtistsPlaylist {
  id: string;
  name: string;
}

interface Track {
  id: string;
  name: string;
  artists: ArtistsPlaylist[];
  images: { url: string }[];
  album: {
    images: { url: string }[];
    name: string;
    id: string;
  };
  duration_ms: number;
}

interface ItemsPlaylist {
  track: Track;
  added_at: string;
}

export interface PlaylistTracksResponse {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { id: string; display_name: string; images: { url: string }[] };
  tracks: {
    items: ItemsPlaylist[];
  };
  followers: {
    total: string;
  };
}

export interface ArtistsDetails {
  id: string;
  name: string;
  images: { url: string }[];
  followers: {
    total: number;
  };
}

export const getPlaylistTracks = async (
  playlistId: string
): Promise<PlaylistTracksResponse> => {
  const result = await request.get(`/v1/playlists/${playlistId}`);
  return result.data;
};
export const getTotalTracks = (total: PlaylistTracksResponse): number => {
  return total.tracks.items.length;
};

export const getArtistDetails = async (id: string): Promise<ArtistsDetails> => {
  const result = await request.get(`/v1/artists/${id}`);
  return result.data;
};

export const putPlaylist = async (playlist_id) => {
  const result = await request.put(`/v1/playlists/${playlist_id}/followers`, {
    params: { playlist_id },
  });
  return result.data;
};

export const deletePlaylist = async (playlist_id) => {
  const result = await request.delete(`/v1/playlists/${playlist_id}/followers`, {
    params: { playlist_id },
  });
  return result.data;
};