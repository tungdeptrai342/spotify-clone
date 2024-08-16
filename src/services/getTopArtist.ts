import { AxiosResponse } from "axios";
import request from "../config/request";

interface TracksTopItem {
  album: {
    images: { url: string }[];
    name: string;
    id: string;
  };
  name: string;
  duration_ms: number;
  id: string;
  track_number: number;
}

export interface ArtistTopItem {
  tracks: TracksTopItem[];
}

interface ItemsArtistAlbum {
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
  type: string;
}

export interface ResponseArtistAlbums {
  items: ItemsArtistAlbum[];
}


export const getTopArtist = async (id: string): Promise<ArtistTopItem> => {
  const result: AxiosResponse<ArtistTopItem> = await request.get(
    `/v1/artists/${id}/top-tracks`
  );
  return result.data;
};

export const getArtistItem = async (
  id: string | null,
  include_groups: string
): Promise<ResponseArtistAlbums> => {
  const result: AxiosResponse<ResponseArtistAlbums> = await request.get(
    `/v1/artists/${id}/albums`,
    {
      params: {
        include_groups,
      },
    }
  );
  return result.data;
};

interface ItemRelatedArtist {
  images: { url: string }[];
  name: string;
  type: string;
  id: string
}
export interface ResponseRelatedArtist {
  artists: ItemRelatedArtist[]
}
export const getRelatedArtist = async(id: string | null): Promise<ResponseRelatedArtist> => {
  const result: AxiosResponse<ResponseRelatedArtist> = await request.get(`/v1/artists/${id}/related-artists`);
  return result.data
}

const fetchFollowedArtists = async (): Promise<ItemRelatedArtist[]> => {
  const result: AxiosResponse<ResponseRelatedArtist> = await request.get('/v1/me/following?type=artist');
  return result.data.artists; // Adjust this based on the actual response structure
};
