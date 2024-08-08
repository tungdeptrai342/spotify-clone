import React, { useContext } from "react";
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

const PlaylistDetails = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  const { data: playlistTracks } = useQuery<PlaylistTracksResponse, Error>(
    ["playlistTracks", playlistId],
    () => getPlaylistTracks(playlistId!),
    {
      enabled: !!playlistId,
    }
  );
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
              ) : null
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
          {playlistTracks?.tracks.items.map((track) => (
            <div className="top-item-songs" key={track.track.id}>
              <div style={{ flexBasis: "40%" }}>
                <CardXL
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                  }}
                  key={track.track.id}
                  cover={
                    track.track.album.images?.length > 0 ? (
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
                            {playlistTracks.tracks.items.indexOf(track) + 1}
                          </p>
                        </div>
                        <div className="top-item-img">
                          <img
                            src={track.track.album.images[0]?.url}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              marginLeft: "25px",
                            }}
                            alt={track.track.name}
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
                      {track.track.name}
                    </p>
                  }
                  description={
                    <div>
                      {track.track.artists?.length > 0 && (
                        <div
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <p>
                            {track?.track?.artists?.map((artist, index) => (
                              <React.Fragment key={artist.name}>
                                <span
                                  onClick={() =>
                                    navigate(`/artists/${artist.id}`)
                                  }
                                >
                                  {artist.name}
                                </span>

                                {index < track?.track?.artists?.length - 1 &&
                                  ", "}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      )}
                    </div>
                  }
                />
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
                  onClick={() => navigate(`/album/${track.track.album.id}`)}

                >
                  {track.track.album.name}
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
                  {formatDate(track.added_at)}
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
                  <p>{formatDuration(track.track.duration_ms)}</p>
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
      <FooterComponent></FooterComponent>
    </div>
  );
};
export default PlaylistDetails;
