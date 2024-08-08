import { AxiosResponse } from "axios";
import request from "../config/request";
import { getAccessToken } from "../config/accessToken";

export interface ApiDataType {
  id: string;
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

export const getUser = async (user_id: string): Promise<ApiDataType> => {
  try {
    const result: AxiosResponse<ApiDataType> = await request.get(
      `/v1/users/${user_id}`
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
}

export interface PlaylistsResponse {
  items: Playlist[];
}

export const getUserPlaylists = async (
  userId: string
): Promise<PlaylistsResponse> => {
  try {
    const result: AxiosResponse<PlaylistsResponse> = await request.get(
      `/v1/users/${userId}/playlists`
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch user playlists: ${error.message}`);
  }
};

export interface Album {
  album: {
    id: string;
    name: string;
    images: { url: string }[];
    artists: { name: string }[];
    total_tracks: number;
  };
}

export interface SavedAlbumsResponse {
  items: Album[];
}

export const getUserSavedAlbums = async (): Promise<SavedAlbumsResponse> => {
  try {
    // Gọi API lấy album đã lưu
    const result: AxiosResponse<SavedAlbumsResponse> = await request.get(
      `/v1/me/albums`
    );
    return result.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch user saved albums: ${error.message}`);
  }
};

export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  images: { url: string }[];
}

export interface RecommendationsResponse {
  tracks: Track[];
}

export const getRecommendTracks = async (
  seed_artists: string,
  seed_genres: string,
  seed_tracks: string
): Promise<RecommendationsResponse> => {
  try {
    const result: AxiosResponse<RecommendationsResponse> = await request.get(
      "/v1/recommendations",
      {
        params: {
          seed_artists,
          seed_genres,
          seed_tracks,
        },
      }
    );
    console.log("aaaaaaaaa", result);
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch recommendations: ${error.message}`);
  }
};

export interface Shows {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  publisher: string;
}

export interface ShowsResponse {
  shows: Shows[];
}

export const getShows = async (ids: string): Promise<ShowsResponse> => {
  try {
    const result: AxiosResponse<ShowsResponse> = await request.get(
      "/v1/shows",
      {
        params: {
          ids,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch recommendations: ${error.message}`);
  }
};

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
}

export interface FeaturedPlaylistsResponse {
  playlists: {
    items: Playlist[];
  };
}

export const getPlaylists = async (): Promise<FeaturedPlaylistsResponse> => {
  try {
    const result: AxiosResponse<FeaturedPlaylistsResponse> = await request.get(
      "/v1/browse/featured-playlists"
    );
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch recommendations: ${error.message}`);
  }
};

export interface Artists {
  id: string;
  name: string;
  href: string;
  images: { url: string }[];
}

export interface ArtistsResponse {
  artists: Artists[];
}

export const getArtists = async (ids: string): Promise<ArtistsResponse> => {
  try {
    const result: AxiosResponse<ArtistsResponse> = await request.get(
      "/v1/artists",
      {
        params: {
          ids,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw new Error("Failed");
  }
};

export interface Audiobooks {
  id: string;
  authors: { name: string }[];
  description: string;
  href: string;
  publisher: string;
  name: string;
  images: { url: string }[];
}

export interface AudiobooksResponse {
  audiobooks: Audiobooks[];
}

export const getAudiobookds = async (
  ids: string
): Promise<AudiobooksResponse> => {
  try {
    const result: AxiosResponse<AudiobooksResponse> = await request.get(
      "/v1/audiobooks",
      { params: { ids } }
    );
    return result.data;
  } catch (error) {
    throw new Error("failded");
  }
};
