import React from "react";
import { useQuery } from "react-query";
import { Card, Dropdown } from "antd";
import Meta from "antd/es/card/Meta";
import { getAccessToken } from "../../config/accessToken";
import {
  FeaturedPlaylistsResponse,
  getPlaylists,
  getUserPlaylists,
  PlaylistsResponse,
} from "../../services/getUsers";
import FooterComponent from "../../components/FooterComponent";
import "./index.css";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../components/DropdownComponent";
import { useApiContext } from "../../Contex";

const MusicPage = () => {
  const {
    userPlaylist,
    setUserPlaylist,
  } = useApiContext();

  const userId = "31kgeh75edzsu6zoftj3lwpiq4ye";
  const {refetch} = useQuery<PlaylistsResponse, Error>(
    ["playlists", userId],
    () => getUserPlaylists(userId),
    {
      enabled: !!getAccessToken() && !userPlaylist,
      onSuccess: (data) => setUserPlaylist(data),
    }
  );

  const { data: featuredPlaylists } = useQuery<
    FeaturedPlaylistsResponse,
    Error
  >(["playlists"], getPlaylists, {
    enabled: !!getAccessToken(),
  });

  const navigate = useNavigate();
  
  const isInLibrary = (playlistId: string) => {
    return userPlaylist?.items.some((playlist) => playlist.id === playlistId);
  };

  return (
    <div className="user-profile">
      <div className="card-music-container">
        {featuredPlaylists?.playlists.items.map((playlist) => (
          <Dropdown
            key={playlist.id}
            overlay={
              <DropdownMenu
                playlistId={playlist.id}
                isInLibrary={isInLibrary(playlist.id)}
                refetch={refetch}
              />
            }
            trigger={["contextMenu"]}
          >
            <Card
              className="card-music-page"
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              cover={
                playlist.images && playlist.images.length > 0 ? (
                  <img src={playlist.images[0].url} alt={playlist.name} />
                ) : null
              }
            >
              <Meta
                title={<span className="meta-title">{playlist.name}</span>}
                description={
                  <span className="description">{playlist.description}</span>
                }
              />
            </Card>
          </Dropdown>
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default MusicPage;
