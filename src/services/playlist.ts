import { AxiosResponse } from "axios";
import request from "../config/request";

export const postPlaylist = async (user_id: string) => {
  const result = await request.post(`/v1/users/${user_id}/playlists`, {
    name: "Playlist của tôi",
    description: "Play mới",
    public: true,
  });
  return result.data;
};

export const postItemPlaylist = async (playlist_id: string, uris: string[]) => {
  const result = await request.post(`/v1/playlists/${playlist_id}/tracks`, {
    uris,
  });
  return result.data;
};


export const deleteItemPlaylist = async (playlist_id: string, trackUris: string[]) => {
  const result: AxiosResponse<any> = await request.delete(`/v1/playlists/${playlist_id}/tracks`, {
    data: {
      tracks: trackUris.map(uri => ({ uri })) 
    },
  });
  return result.data;
};


export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  uris: string;
}

export interface PlaylistsResponse {
  items: Playlist[];
  total: number;
}

export const getUserPlaylists = async (
  user_id: string
): Promise<PlaylistsResponse> => {
  try {
    const result: AxiosResponse<PlaylistsResponse> = await request.get(
      `/v1/users/${user_id}/playlists`
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch playlists: ${error.message}`);
  }
};
