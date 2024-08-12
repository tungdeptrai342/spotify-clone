import { AxiosResponse } from "axios";
import request from "../config/request";

export interface TrackItem {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

export interface SearchResponse {
  tracks: {
    items: TrackItem[];
  };
}

export const searchSpotify = async (query: string): Promise<TrackItem[]> => {
  try {
    const result: AxiosResponse<SearchResponse> = await request.get(`/v1/search`, {
      params: {
        q: query,
        type: "track", // Bạn có thể thay đổi thành "artist", "album", etc.
      },
    });
    return result.data.tracks.items;
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error.message}`);
  }
};
