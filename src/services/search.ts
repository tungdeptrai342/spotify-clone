import { AxiosResponse } from "axios";
import request from "../config/request";

export interface AlbumItem {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

export interface ArtistItem {
  id: string;
  name: string;
  images: { url: string }[];
}

export interface PlaylistItem {
  id: string;
  name: string;
  images: { url: string }[];
}

export interface TrackItem {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

export interface SearchResponse {
  albums: {
    items: AlbumItem[];
  };
  artists: {
    items: ArtistItem[];
  };
  playlists: {
    items: PlaylistItem[];
  };
  tracks: {
    items: TrackItem[];
  };
}

export const searchSpotify = async (query: string): Promise<SearchResponse> => {
  try {
    const result: AxiosResponse<SearchResponse> = await request.get(`/v1/search`, {
      params: {
        q: query,
        type: "album,artist,playlist,track", // Gọi API với nhiều loại dữ liệu
      },
    });
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error.message}`);
  }
};
