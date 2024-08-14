import React, { useEffect, useMemo, useState } from "react";
import { getAccessToken, setAccessToken } from "../../config/accessToken";
import {
  ApiDataType,
  ArtistsResponse,
  AudiobooksResponse,
  FeaturedPlaylistsResponse,
  getArtists,
  getAudiobookds,
  getPlaylists,
  getShows,
  getUser,
  getUserPlaylists,
  getUserSavedAlbums,
  PlaylistsResponse,
  SavedAlbumsResponse,
  ShowsResponse,
} from "../../services/getUsers";
import { useMutation, useQuery } from "react-query";
import "./index.css";
import { Card, Dropdown } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import { useApiContext } from "../../Contex";
import DropdownMenu from "../../components/DropdownComponent";

const Main: React.FC = () => {
  const userId = "31kgeh75edzsu6zoftj3lwpiq4ye";
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null
  );

  const navigate = useNavigate();
  const {
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
  } = useApiContext();

  const { refetch } = useQuery<PlaylistsResponse, Error>(
    ["playlists", userId],
    () => getUserPlaylists(userId),
    {
      enabled: !!getAccessToken() && !userPlaylist,
      onSuccess: (data) => setUserPlaylist(data),
    }
  );

  useQuery<SavedAlbumsResponse, Error>(["savedAlbums"], getUserSavedAlbums, {
    enabled: !!getAccessToken() && !savedAlbumsData,
    onSuccess: (data) => setSavedAlbumsData(data),
  });

  useQuery<ApiDataType, Error>(["user", userId], () => getUser(userId), {
    enabled: !userData,
    onSuccess: (data) => setUserData(data),
  });

  const ids = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ";
  useQuery<ShowsResponse, Error>(["show", ids], () => getShows(ids), {
    enabled: !!getAccessToken() && !showData,
    onSuccess: (data) => setShowData(data),
  });

  useQuery<FeaturedPlaylistsResponse, Error>(["playlists"], getPlaylists, {
    enabled: !!getAccessToken() && !featuredPlaylists,
    onSuccess: (data) => setFeaturedPlaylists(data),
  });

  const id =
    "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6";
  useQuery<ArtistsResponse, Error>(["artists", id], () => getArtists(id), {
    enabled: !!getAccessToken() && !artists,
    onSuccess: (data) => setArtists(data),
  });

  const audiobooksId =
    "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe";
  useQuery<AudiobooksResponse, Error>(
    ["audiobooks", audiobooksId],
    () => getAudiobookds(audiobooksId),
    {
      enabled: !!getAccessToken() && !audiobooks,
      onSuccess: (data) => setAudiobooks(data),
    }
  );

  const handleContextMenu = (e: React.MouseEvent, playlistId: string) => {
    e.preventDefault();
    setCurrentPlaylistId(playlistId);
  };

  const isInLibrary = (playlistId: string) => {
    return userPlaylist?.items.some((playlist) => playlist.id === playlistId);
  };

  return (
    <div className="main">
      <Link to={""} style={{ color: "white", textDecoration: "none" }}>
        <h1> Playlist của {userData?.display_name}</h1>
      </Link>
      <div className="card-playlist-container">
        {userPlaylist?.items.slice(0, 6).map((playlist) => (
          <Dropdown
            key={playlist.id}
            overlay={
              <DropdownMenu
                playlistId={playlist.id}
                isInLibrary={isInLibrary(playlist.id)}
                refetch={refetch}              />
            }
            trigger={["contextMenu"]}
            onOpenChange={(flag) => !flag && setCurrentPlaylistId(null)}
          >
            <Card
              style={{ marginRight: "10px" }}
              className="card-playlist"
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              onContextMenu={(e) => handleContextMenu(e, playlist.id)}
              cover={
                playlist.images && playlist.images.length > 0 ? (
                  <img
                    style={{ width: "218px", height: "218px", padding: "8px" }}
                    src={playlist.images[0].url}
                    alt={playlist.name}
                  />
                ) : (
                  <img
                    style={{ width: "218px", height: "218px" }}
                    src={"https://lastfm.freetls.fastly.net/i/u/300x300/6d4109c4072cc6d0f7905d1825dfd6b6.jpg"}
                  />
                )
              }
            >
              <Meta
                style={{ width: "218px" }}
                title={<span className="meta-title">{playlist.name}</span>}
                description={`Total Tracks: ${playlist.tracks.total}`}
              />
            </Card>
          </Dropdown>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link
          to={""}
          style={{ color: "white", textDecoration: "none", marginTop: "20px" }}
        >
          <h1>Try some show</h1>
        </Link>
      </div>
      <div className="card-playlist-container">
        {showData?.shows.map((show) => (
          <Card
            style={{ marginRight: "10px" }}
            className="card-playlist"
            key={show.id}
            cover={
              show.images && show.images.length > 0 ? (
                <img
                  style={{ width: "218px", height: "218px", padding: "8px" }}
                  src={show.images[0].url}
                  alt={show.name}
                />
              ) : null
            }
          >
            <Meta
              style={{ width: "218px" }}
              title={<span className="meta-title">{show.name}</span>}
              description={show.publisher}
            />
          </Card>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link
          to={""}
          style={{ color: "white", textDecoration: "none", marginTop: "20px" }}
        >
          <h1>Playlist today</h1>
        </Link>
      </div>
      <div className="card-playlist-container">
        {featuredPlaylists?.playlists.items.slice(0, 6).map((playlist) => (
          <Dropdown
            key={playlist.id}
            overlay={
              <DropdownMenu
                playlistId={playlist.id}
                isInLibrary={isInLibrary(playlist.id)}
                refetch={refetch}              />
            }
            trigger={["contextMenu"]}
            onOpenChange={(flag) => !flag && setCurrentPlaylistId(null)}
          >
            <Card
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              style={{ marginRight: "10px" }}
              className="card-playlist"
              key={playlist.id}
              cover={
                playlist.images && playlist.images.length > 0 ? (
                  <img
                    style={{ width: "218px", height: "218px", padding: "8px" }}
                    src={playlist.images[0].url}
                    alt={playlist.name}
                  />
                ) : null
              }
            >
              <Meta
                style={{ width: "218px" }}
                title={<span className="meta-title">{playlist.name}</span>}
                description={playlist.description}
              />
            </Card>
          </Dropdown>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link
          to={""}
          style={{ color: "white", textDecoration: "none", marginTop: "20px" }}
        >
          <h1>Album today</h1>
        </Link>
      </div>
      <div className="card-playlist-container">
        {savedAlbumsData?.items.slice(0, 6).map(({ album }) => (
          <Card
            style={{ marginRight: "10px" }}
            className="card-playlist"
            key={album.id}
            onClick={() => navigate(`/album/${album.id}`)}
            cover={
              album.images && album.images.length > 0 ? (
                <img
                  style={{ width: "218px", height: "218px", padding: "8px" }}
                  src={album.images[0].url}
                  alt={album.name}
                />
              ) : null
            }
          >
            <Meta
              style={{ width: "218px" }}
              title={<span className="meta-title">{album.name}</span>}
              description={album.name}
            />
          </Card>
        ))}
      </div>

      <div className="card-artists">
        <div style={{ marginTop: "10px" }}>
          <Link
            to={""}
            style={{
              color: "white",
              textDecoration: "none",
              marginTop: "20px",
            }}
          >
            <h1>Artists for you</h1>
          </Link>
        </div>
        <div
          className="card-artists-container"
          style={{ display: "flex", marginTop: "20px" }}
        >
          {artists?.artists.map((artists) => (
            <Card
              onClick={() => navigate(`/artists/${artists.id}`)}
              style={{ marginRight: "10px" }}
              className="card-playlist"
              key={artists.id}
              cover={
                artists.images && artists.images.length > 0 ? (
                  <img
                    style={{
                      width: "218px",
                      height: "218px",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                    src={artists.images[0].url}
                    alt={artists.name}
                  />
                ) : null
              }
            >
              <Meta
                style={{ width: "218px" }}
                title={<span className="meta-title">{artists.name}</span>}
                description={artists.name}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* // */}

      <div className="card-audiobooks">
        <div style={{ marginTop: "10px" }}>
          <Link
            to={""}
            style={{
              color: "white",
              textDecoration: "none",
              marginTop: "20px",
            }}
          >
            <h1>Audiobooks for you</h1>
          </Link>
        </div>

        <div
          className="card-artists-container"
          style={{ display: "flex", marginTop: "20px" }}
        >
          {audiobooks?.audiobooks.map((audiobook) => (
            <Card
              style={{ marginRight: "10px" }}
              className="card-playlist"
              key={audiobook.id}
              cover={
                audiobook.images && audiobook.images.length > 0 ? (
                  <img
                    style={{
                      width: "218px",
                      height: "218px",
                      padding: "8px",
                    }}
                    src={audiobook.images[0].url}
                    alt={audiobook.name}
                  />
                ) : null
              }
            >
              <Meta
                style={{ width: "218px" }}
                title={<span className="meta-title">{audiobook.name}</span>}
                description={audiobook.publisher}
              />
            </Card>
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Main;
