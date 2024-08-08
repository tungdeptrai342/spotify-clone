import React, { useState } from "react";
import FooterComponent from "../../components/FooterComponent";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlbumDetailsResponse,
  AlbumOfArtists,
  getAlbumArtist,
  getAlbumDetails,
} from "../../services/albumDetails";
import { useQuery } from "react-query";
import CardXL from "../../components/CardXL";
import {
  ClockCircleOutlined,
  PlusCircleOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { formatDuration } from "../ProfileUser";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artistId, setArtistId] = useState<string | null>(null);

  const { data: albumDetail } = useQuery<AlbumDetailsResponse, Error>(
    ["albumDetail", id],
    () => getAlbumDetails(id!),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setArtistId(data.artists[0].id);
      },
    }
  );

  const { data: albumArtist } = useQuery<AlbumOfArtists, Error>(
    ["AlbumArtist", artistId],
    () => getAlbumArtist(artistId!),
    {
      enabled: !!artistId,
    }
  );
  const navigate = useNavigate();

  return (
    <div className="playlist-details">
      <div className="playlist-details-container">
        <div>
          <div>
            <CardXL
              style={{ padding: "15px" }}
              cover={
                albumDetail?.images && albumDetail?.images?.length > 0 ? (
                  <img
                    src={albumDetail?.images[0]?.url}
                    style={{
                      width: "232px",
                      height: "232px",
                      objectFit: "cover",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
                    }}
                  />
                ) : null
              }
              title={<p style={{ color: "white" }}>Album</p>}
              description={
                <div>
                  <h1
                    style={{
                      color: "white",
                      fontSize: "60px",
                      marginTop: "-20px",
                    }}
                  >
                    {albumDetail?.name}
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
                      {albumDetail?.name}
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
                        ~ {albumDetail?.release_date}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "white",
                          fontSize: "15px",
                          marginLeft: "7px",
                          fontWeight: "700",
                        }}
                      >
                        ~ {albumDetail?.total_tracks} bài hát
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
        {/* /// item */}
        <div className="top-item-container" style={{ marginTop: "20px" }}>
          <div className="title-playlist-container">
            <div
              style={{ color: "white", flexBasis: "80%", marginLeft: "6px" }}
              className="title-playlist-songs"
            >
              <div style={{ marginRight: "15px" }}>#</div> Tiêu đề{" "}
            </div>
            <div
              style={{ color: "white", display: "flex", flexBasis: "20%" }}
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
          {albumDetail?.tracks.items.map((track) => (
            <div className="top-item-songs" key={track.id}>
              <div style={{ flexBasis: "80%" }}>
                <CardXL
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                  }}
                  key={track.id}
                  cover={
                    albumDetail.images?.length > 0 ? (
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
                            {albumDetail.tracks.items.indexOf(track) + 1}
                          </p>
                        </div>
                        <div className="top-item-img">
                          <img
                            src={albumDetail.images[0]?.url}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              marginLeft: "25px",
                            }}
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
                      {track.name}
                    </p>
                  }
                  description={
                    <div>
                      {track.artists?.length > 0 && (
                        <div
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <p>
                            {track?.artists?.map((artist, index) => (
                              <React.Fragment key={artist.name}>
                                <span
                                  onClick={() =>
                                    navigate(`/artists/${artist.id}`)
                                  }
                                >
                                  {artist.name}
                                </span>
                                {index < track?.artists?.length - 1 && ", "}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      )}
                    </div>
                  }
                />
              </div>

              <div className="top-item-duration" style={{ flexBasis: "20%" }}>
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
              <div></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
          <div>
            <p style={{ color: "#B3B3B3", fontSize: "13px" }}>
              {albumDetail?.release_date}
            </p>
          </div>
          <div>
            <p style={{ color: "#B3B3B3", fontSize: "13px" }}>
              {albumDetail?.copyrights[0].text}
            </p>
          </div>
          <div>
            <p style={{ color: "#B3B3B3", fontSize: "13px" }}>
              {albumDetail?.copyrights[0].text}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "70px", marginLeft: "20px" }}>
          <p style={{ color: "white", fontSize: "21px" }}>
            Album khác của {albumDetail?.artists[0].name}
          </p>
        </div>
        <div
          className="card-music-container"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          {albumArtist?.items?.slice(0, 7).map((playlist) => (
            <Card
              className="card-music-page"
              key={playlist.id}
              onClick={() => navigate(`/album/${playlist.id}`)}
              cover={
                playlist.images && playlist.images.length > 0 ? (
                  <img src={playlist.images[0].url} alt={playlist.name} />
                ) : null
              }
            >
              <Meta
                title={<span className="meta-title">{playlist.name}</span>}
                description={
                  <span className="description">{playlist.release_date}</span>
                }
              />
            </Card>
          ))}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default AlbumDetail;
