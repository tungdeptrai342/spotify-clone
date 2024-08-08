import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ApiDataType,
  ArtistsResponse,
  AudiobooksResponse,
  FeaturedPlaylistsResponse,
  PlaylistsResponse,
  SavedAlbumsResponse,
  ShowsResponse,
} from "../services/getUsers";

interface ApiContextProps {
  userPlaylist: PlaylistsResponse | null;
  setUserPlaylist: (data: PlaylistsResponse) => void;
  savedAlbumsData: SavedAlbumsResponse | null;
  setSavedAlbumsData: (data: SavedAlbumsResponse) => void;
  userData: ApiDataType | null;
  setUserData: (data: ApiDataType) => void;
  showData: ShowsResponse | null;
  setShowData: (data: ShowsResponse) => void;
  featuredPlaylists: FeaturedPlaylistsResponse | null;
  setFeaturedPlaylists: (data: FeaturedPlaylistsResponse) => void;
  artists: ArtistsResponse | null;
  setArtists: (data: ArtistsResponse) => void;
  audiobooks: AudiobooksResponse | null;
  setAudiobooks: (data: AudiobooksResponse) => void;
  
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  
  return context;
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [userPlaylist, setUserPlaylist] = useState<PlaylistsResponse | null>(
    null
  );
  const [savedAlbumsData, setSavedAlbumsData] =
    useState<SavedAlbumsResponse | null>(null);
  const [userData, setUserData] = useState<ApiDataType | null>(null);
  const [showData, setShowData] = useState<ShowsResponse | null>(null);
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<FeaturedPlaylistsResponse | null>(null);
  const [artists, setArtists] = useState<ArtistsResponse | null>(null);
  const [audiobooks, setAudiobooks] = useState<AudiobooksResponse | null>(null);

  return (
    <ApiContext.Provider
      value={{
        userPlaylist,
        setUserPlaylist,
        savedAlbumsData,
        setSavedAlbumsData,
        userData,
        setUserData,
        showData,
        setShowData,
        featuredPlaylists,
        setFeaturedPlaylists,
        artists,
        setArtists,
        audiobooks,
        setAudiobooks,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
