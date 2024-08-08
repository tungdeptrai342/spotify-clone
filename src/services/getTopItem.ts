import { AxiosResponse } from "axios";
import request from "../config/request";


interface ExternalUrls {
  spotify: string;
}

interface Artist {
  name: string;
  external_urls: ExternalUrls;
  id: string
}

export interface Track {
  id: string;
  name: string;
  album: {
    images: TrackImage[];
    name: string;
    id: string
  };
  artists: Artist[];
  duration_ms: number;
}

export interface FeaturedTracksResponse {
  items: Track[];
}

export const getTopTracks = async (
  time_range: string
): Promise<FeaturedTracksResponse> => {
  try {
    const result: AxiosResponse<FeaturedTracksResponse> = await request.get(
      "/v1/me/top/tracks",
      {
        params: {
          time_range,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch top tracks: ${error.message}`);
  }
};

export interface TrackImage {
  url: string;
}
export interface ArtistFl {
  id: string;
  name: string;
  images: TrackImage[];
}

export interface FeaturedArtistFL {
  artists: {
    items: ArtistFl[];
  };}
  
  export const getArtistsFL = async (): Promise<FeaturedArtistFL> => {
    try {
      const result: AxiosResponse<FeaturedArtistFL> = await request.get(
      "/v1/me/following?type=artist"
    );
    return result.data;
  } catch (error) {
    throw new Error("Failed");
  }
};
