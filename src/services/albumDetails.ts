import request from "../config/request";

interface ArtistsDetailsAlbum {
  id: string;
  name: string;
}

interface ItemDetailsResponse {
  artists: ArtistsDetailsAlbum[];
  duration_ms: number;
  name: string;
  id: string;
}

export interface AlbumDetailsResponse {
  total_tracks: number;
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
  artists: ArtistsDetailsAlbum[];
  tracks: {
    items: ItemDetailsResponse[];
  };
  copyrights: { text: string; type: string }[];
  label: string;
}

interface Album {
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
}

export interface AlbumOfArtists {
  items: Album[];
}

export const getAlbumDetails = async (
  id: string
): Promise<AlbumDetailsResponse> => {
  const result = await request.get(`/v1/albums/${id}`);
  return result.data;
};

export const getAlbumArtist = async (
  artistId: string
): Promise<AlbumOfArtists> => {
  const reuslt = await request.get(`/v1/artists/${artistId}/albums`);
  return reuslt.data;
};
