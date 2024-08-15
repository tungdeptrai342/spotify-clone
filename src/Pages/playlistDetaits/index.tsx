import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPlaylistTracks,
  PlaylistTracksResponse,
} from "../../services/playlistDetails";
import CardXL from "../../components/CardXL";
import {
  ClockCircleOutlined,
  PlusCircleOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { formatDuration } from "../ProfileUser";
import "./index.css";
import FooterComponent from "../../components/FooterComponent";
import { Dropdown } from "antd";
import DropdownPlaylistUser from "../../components/DropdownPlaytlistUserComponent";
import EditPlaylistModal from "../../components/ModalEditPlaylistComponent";

const PlaylistDetails = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<PlaylistTracks | null>(null);

  const handleEditClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlaylist(null);
  };

  const { data: playlistTracks, refetch } = useQuery<
    PlaylistTracksResponse,
    Error
  >(["playlistTracks", playlistId], () => getPlaylistTracks(playlistId!), {
    enabled: !!playlistId,
  });

  interface PlaylistTracks {
    id: string;
    name: string;
    images: { url: string }[];
    owner: { display_name: string };
    followers: { total: number };
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const navigate = useNavigate();

  return (
    <div className="playlist-details">
      <div className="playlist-details-container">
        <div>
          <CardXL
            style={{ padding: "15px" }}
            onClick={() => handleEditClick(playlistTracks)}
            cover={
              playlistTracks?.images && playlistTracks?.images?.length > 0 ? (
                <img
                  src={playlistTracks?.images[0]?.url}
                  style={{
                    width: "232px",
                    height: "232px",
                    objectFit: "cover",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
                  }}
                />
              ) : (
                <img
                  src={
                    "https://lastfm.freetls.fastly.net/i/u/300x300/6d4109c4072cc6d0f7905d1825dfd6b6.jpg"
                  }
                />
              )
            }
            title={<p style={{ color: "white" }}>Playlist</p>}
            description={
              <div>
                <h1
                  style={{
                    color: "white",
                    fontSize: "60px",
                    marginTop: "-20px",
                  }}
                >
                  {playlistTracks?.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginLeft: "7px",
                      fontWeight: "700",
                    }}
                  >
                    {playlistTracks?.owner.display_name}
                  </p>
                  <div>
                    <p
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "7px",
                        fontWeight: "700",
                      }}
                    >
                      ~ {playlistTracks?.followers.total} lượt lưu
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="top-item-container" style={{ marginTop: "20px" }}>
          <div className="title-playlist-container">
            <div style={{ color: "white" }} className="title-playlist-songs">
              <div style={{ marginRight: "15px" }}>#</div> Tiêu đề{" "}
            </div>
            <div style={{ color: "white" }} className="title-playlist-album">
              Album
            </div>
            <div style={{ color: "white" }} className="title-playlist-date">
              Ngày thêm
            </div>
            <div
              style={{ color: "white", display: "flex" }}
              className="title-playlist-duration"
            >
              <div>
                <p
                  style={{ color: "white", marginRight: "30px" }}
                  className="icon-duration"
                >
                  <PlusCircleOutlined />
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <ClockCircleOutlined />
                </p>
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
          {playlistTracks?.tracks.items.map((item) => (
            <Dropdown
              key={item.id}
              overlay={
                <DropdownPlaylistUser
                  trackUri={`spotify:track:${item.track.id}`}
                  refetch={refetch}
                  currentPlaylistId={playlistTracks.id}
                />
              }
              trigger={["contextMenu"]}
            >
              <div className="top-item-songs" key={item.track.id}>
                <div style={{ flexBasis: "40%" }}>
                  <CardXL
                    style={{
                      backgroundColor: "transparent",
                      padding: "10px",
                    }}
                    key={item.track.id}
                    cover={
                      item.track.album.images?.length > 0 ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            className="top-item-stt"
                            style={{
                              width: "20px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <p
                              style={{
                                color: "white",
                              }}
                            >
                              {playlistTracks.tracks.items.indexOf(item) + 1}
                            </p>
                          </div>
                          <div className="top-item-img">
                            <img
                              src={item.track.album.images[0]?.url}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                marginLeft: "25px",
                              }}
                              alt={item.track.name}
                            />
                          </div>
                        </div>
                      ) : null
                    }
                    title={
                      <p
                        style={{
                          color: "white",
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.track.name}
                      </p>
                    }
                    description={
                      <div>
                        {item.track.artists?.length > 0 && (
                          <div
                            style={{
                              maxWidth: "300px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p>
                              {item?.track?.artists?.map((artist, index) => (
                                <React.Fragment key={artist.name}>
                                  <span
                                    onClick={() =>
                                      navigate(`/artists/${artist.id}`)
                                    }
                                  >
                                    {artist.name}
                                  </span>

                                  {index < item?.track?.artists?.length - 1 &&
                                    ", "}
                                </React.Fragment>
                              ))}
                            </p>
                          </div>
                        )}
                      </div>
                    }
                  />
                  {selectedPlaylist && (
                    <EditPlaylistModal
                      visible={modalVisible}
                      onClose={handleCloseModal}
                      playlistId={selectedPlaylist.id}
                      currentName={selectedPlaylist.name}
                      currentImage={selectedPlaylist.images[0]?.url}
                    />
                  )}
                </div>
                <div className="top-item-album" style={{ flexBasis: "30%" }}>
                  <p
                    style={{
                      color: "white",
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => navigate(`/album/${item.track.album.id}`)}
                  >
                    {item.track.album.name}
                  </p>{" "}
                </div>
                <div className="top-item-date" style={{ flexBasis: "25%" }}>
                  <p
                    style={{
                      color: "white",
                      width: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {formatDate(item.added_at)}
                  </p>{" "}
                </div>
                <div className="top-item-duration" style={{ flexBasis: "10%" }}>
                  <div>
                    <p
                      style={{ color: "white", marginRight: "30px" }}
                      className="icon-duration"
                    >
                      <PlusCircleOutlined />
                    </p>
                  </div>
                  <div>
                    <p>{formatDuration(item.track.duration_ms)}</p>
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
            </Dropdown>
          ))}
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
};
export default PlaylistDetails;
