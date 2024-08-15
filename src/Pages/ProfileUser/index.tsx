import React from "react";
import { useQuery } from "react-query";
import "./index.css";
import FooterComponent from "../../components/FooterComponent";
import CardXL from "../../components/CardXL";
import {
  ApiDataType,
  getUser,
  getUserPlaylists,
  PlaylistsResponse,
} from "../../services/getUsers";
import { getAccessToken } from "../../config/accessToken";
import {
  FeaturedArtistFL,
  FeaturedTracksResponse,
  getArtistsFL,
  getTopTracks,
} from "../../services/getTopItem";
import { Card, Dropdown } from "antd";
import Meta from "antd/es/card/Meta";
import { PlusCircleOutlined, SmallDashOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../components/DropdownComponent";

export function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const ProfileUser = () => {
  const userId = "31kgeh75edzsu6zoftj3lwpiq4ye";
  const timeRage = "long_term";

  const { data } = useQuery<ApiDataType, Error>(
    ["user", userId],
    () => getUser(userId),
    {
      enabled: !!getAccessToken(),
    }
  );

  const { data: topItems } = useQuery<FeaturedTracksResponse, Error>(
    ["top-item", timeRage],
    () => getTopTracks(timeRage),
    {
      enabled: !!getAccessToken(),
    }
  );

  const { data: userPlaylist, refetch } = useQuery<PlaylistsResponse, Error>(
    ["playlists", userId],
    () => getUserPlaylists(userId),
    {
      enabled: !!getAccessToken(),
    }
  );

  const { data: artists } = useQuery<FeaturedArtistFL, Error>(
    ["artists"],
    () => getArtistsFL(),
    {
      enabled: !!getAccessToken(),
    }
  );
  const navigate = useNavigate();

  const playlistCount = userPlaylist?.items.length || 0;
  const isInLibrary = (playlistId: string) => {
    return userPlaylist?.items.some((playlist) => playlist.id === playlistId);
  };
  return (
    <div className="profile-user">
      <div className="profile-user-container">
        <div>
          <CardXL
            style={{ padding: "15px" }}
            cover={
              data?.images && data.images.length > 0 ? (
                <img
                  src={data.images[1].url}
                  style={{
                    width: "232px",
                    height: "232px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
                  }}
                />
              ) : null
            }
            title={<p style={{ color: "white" }}>Hồ sơ</p>}
            description={
              <div>
                <h1
                  style={{
                    color: "white",
                    fontSize: "80px",
                    marginTop: "-20px",
                  }}
                >
                  {data?.display_name}
                </h1>
                <div>
                  <p style={{ color: "white", fontSize: "15px" }}>
                    {playlistCount} danh sách công khai
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div className="content-profile-page">
          <div className="head-content">
            <h1
              style={{ color: "white", marginBottom: "10px" }}
              className="header-content-user"
            >
              Bản nhạc hàng đầu tháng này
            </h1>
            <p>Chỉ hiển thị với bạn</p>
            <div className="top-item"></div>
          </div>
        </div>

        {/* Top item */}
        <div className="top-item">
          <div className="top-item-container">
            {topItems?.items.slice(0, 4).map((track, index) => (
              <div className="top-item-songs" key={track.id}>
                <div style={{ flexBasis: "50%" }}>
                  <CardXL
                    style={{
                      backgroundColor: "transparent",
                      padding: "10px",
                    }}
                    key={track.id}
                    cover={
                      track.album.images.length > 0 ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="top-item-stt">
                            <p
                              style={{
                                color: "white",
                                padding: "8px",
                                fontSize: "19px",
                                marginRight: "15px",
                              }}
                            >
                              {topItems.items.indexOf(track) + 1}
                            </p>
                          </div>
                          <div className="top-item-img">
                            <img
                              src={track.album.images[0].url}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                              alt={track.name}
                            />
                          </div>
                        </div>
                      ) : null
                    }
                    title={
                      <p
                        style={{
                          color: "white",
                          width: "500px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {track.name}
                      </p>
                    }
                    description={
                      <div>
                        {track.artists.length > 0 && (
                          <div>
                            <p>
                              {track.artists.map((artist, index) => (
                                <React.Fragment key={artist.name}>
                                  <span
                                    onClick={() =>
                                      navigate(`/artists/${artist.id}`)
                                    }
                                  >
                                    {artist.name}
                                  </span>
                                  {index < track.artists.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </p>
                          </div>
                        )}
                      </div>
                    }
                  />
                </div>
                <div className="top-item-album">
                  <p onClick={() => navigate(`/album/${track.album.id}`)}>
                    {track.album.name}
                  </p>
                </div>
                <div className="top-item-duration">
                  <div>
                    <p
                      style={{ color: "white", marginRight: "30px" }}
                      className="icon-duration"
                    >
                      <PlusCircleOutlined />
                    </p>
                  </div>
                  <div>
                    <p>{formatDuration(track.duration_ms)}</p>
                  </div>
                  <div>
                    <p
                      style={{ color: "white", marginLeft: "30px" }}
                      className="icon-duration"
                    >
                      <SmallDashOutlined />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* playlist */}
        <h1
          style={{
            color: "white",
            marginTop: "50px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
          className="playlist-header-user"
        >
          Playlist công khai
        </h1>
        <div
          className="card-music-container"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          {userPlaylist?.items.slice(0, 7).map((playlist) => (
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
                  ) : (
                    <img
                      src={
                        "https://lastfm.freetls.fastly.net/i/u/300x300/6d4109c4072cc6d0f7905d1825dfd6b6.jpg"
                      }
                    />
                  )
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
        <h1
          style={{
            color: "white",
            marginLeft: "20px",
            cursor: "pointer",
          }}
          className="playlist-header-user"
        >
          Đang theo dõi
        </h1>

        <div
          className="card-artists-container"
          style={{ display: "flex", marginTop: "20px", marginLeft: "20px" }}
        >
          {artists?.artists.items?.map((artist) => (
            <Card
              style={{ marginRight: "10px" }}
              className="card-playlist"
              key={artist.id}
              onClick={() => navigate(`/artists/${artist.id}`)}
              cover={
                artist.images && artist.images.length > 0 ? (
                  <img
                    style={{
                      width: "218px",
                      height: "218px",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                    src={artist.images[0].url}
                    alt={artist.name}
                  />
                ) : null
              }
            >
              <Meta
                style={{ width: "218px" }}
                title={<span className="meta-title">{artist.name}</span>}
                description={<span>Hồ sơ</span>}
              />
            </Card>
          ))}
        </div>

        <FooterComponent />
      </div>
    </div>
  );
};

export default ProfileUser;
