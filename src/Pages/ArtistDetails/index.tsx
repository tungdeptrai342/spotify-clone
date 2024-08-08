import React, { useState } from "react";
import FooterComponent from "../../components/FooterComponent";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  ArtistsDetails,
  getArtistDetails,
} from "../../services/playlistDetails";
import CardXL from "../../components/CardXL";
import {
  ArtistTopItem,
  getArtistItem,
  getRelatedArtist,
  getTopArtist,
  ResponseArtistAlbums,
  ResponseRelatedArtist,
} from "../../services/getTopArtist";
import { PlusCircleOutlined, SmallDashOutlined } from "@ant-design/icons";
import { formatDuration } from "../ProfileUser";
import { Breadcrumb, Card } from "antd";
import Meta from "antd/es/card/Meta";

const ArtistsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artistId, setArtistId] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const [albumType, setAlbumType] = useState("album");
  const [hasAlbums, setHasAlbums] = useState(true);

  const { data: artistDetails } = useQuery<ArtistsDetails, Error>(
    ["playlist-Detail", id],
    () => getArtistDetails(id!),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setArtistId(data.id);
      },
    }
  );

  const { data: artistTopItems } = useQuery<ArtistTopItem, Error>(
    ["AlbumArtist", artistId],
    () => getTopArtist(artistId!),
    {
      enabled: !!artistId,
    }
  );

  const { data: albums } = useQuery<ResponseArtistAlbums>(
    ["albums", artistId, albumType],
    () => getArtistItem(artistId, albumType),
    {
      enabled: !!artistId,
      onSuccess: (data) => {
        if (data.items.length === 0 && albumType === "album") {
          setHasAlbums(false);
          setAlbumType("single");
        } else {
          setHasAlbums(true);
        }
      },
    }
  );

  const { data: related } = useQuery<ResponseRelatedArtist>(
    ["related", artistId],
    () => getRelatedArtist(artistId)!,
    {
      enabled: !!artistId,
    }
  );

  const appears_on = "appears_on";
  const { data: albumsAppear } = useQuery<ResponseArtistAlbums>(
    ["albums", artistId, appears_on],
    () => getArtistItem(artistId, appears_on),
    {
      enabled: !!artistId,
    }
  );

  const toggleItemsVisibility = () => {
    if (artistTopItems) {
      setShowAll(!showAll);
      setVisibleItems(showAll ? 4 : artistTopItems.tracks.length);
    }
  };

  const handleBreadcrumbClick = (type) => {
    if (albumType) {
      setAlbumType(type);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="profile-user">
      <div className="profile-user-container">
        <div>
          <CardXL
            style={{ padding: "15px" }}
            cover={
              artistDetails?.images && artistDetails.images.length > 0 ? (
                <img
                  src={artistDetails.images[1].url}
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
            title={<p style={{ color: "white" }}>Nghệ sĩ</p>}
            description={
              <div>
                <h1
                  style={{
                    color: "white",
                    fontSize: "80px",
                    marginTop: "-20px",
                  }}
                >
                  {artistDetails?.name}
                </h1>
                <div>
                  <p style={{ color: "white", fontSize: "15px" }}>
                    ~ {artistDetails?.followers.total} người theo dõi
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <h1 style={{ color: "white", padding: "15px", marginTop: "20px" }}>
          Phổ biến
        </h1>
        <div className="top-item">
          <div className="top-item-container">
            {artistTopItems?.tracks?.slice(0, visibleItems).map((track) => (
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
                              {artistTopItems.tracks.indexOf(track) + 1}
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
            <p onClick={toggleItemsVisibility} style={{ color: "white" }}>
              {showAll ? "Show Less" : "Show More"}
            </p>
          </div>
          <div style={{ marginTop: "70px" }}>
            <h1 style={{ color: "white" }}>Danh sách đĩa nhạc</h1>
            <div style={{ display: "flex" }}>
              <Breadcrumb
                style={{
                  marginTop: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex" }}>
                  {hasAlbums && (
                    <Breadcrumb.Item
                      onClick={() => handleBreadcrumbClick("album")}
                    >
                      <p
                        className={
                          albumType === "album"
                            ? "breadcrumb-active"
                            : "breadcrumb-item"
                        }
                      >
                        album
                      </p>
                    </Breadcrumb.Item>
                  )}
                  <Breadcrumb.Item
                    onClick={() => handleBreadcrumbClick("single")}
                  >
                    <p
                      className={
                        albumType === "single"
                          ? "breadcrumb-active"
                          : "breadcrumb-item"
                      }
                    >
                      Single
                    </p>
                  </Breadcrumb.Item>
                </div>
              </Breadcrumb>
            </div>
            <div
              className="card-music-container"
              style={{ marginTop: "20px", marginLeft: "20px" }}
            >
              {albums?.items?.slice(0, 7).map((playlist) => (
                <Card
                  className="card-music-page"
                  key={playlist.id}
                  onClick={() => navigate(`/album/${playlist?.id}`)}
                  cover={
                    playlist.images && playlist.images.length > 0 ? (
                      <img src={playlist.images[0].url} alt={playlist.name} />
                    ) : null
                  }
                >
                  <Meta
                    title={<span className="meta-title">{playlist.name}</span>}
                    description={
                      <span className="description">
                        {playlist.release_date} ~~{" "}
                        {albumType === "album" ? "Album" : "Single"}
                      </span>
                    }
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h1 style={{ color: "white", padding: "20px" }}>
            {" "}
            Có sự xuất hiện của {artistDetails?.name}
          </h1>
          <div
            className="card-music-container"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            {albumsAppear?.items?.slice(0, 7).map((playlist) => (
              <Card
                className="card-music-page"
                key={playlist.id}
                onClick={() => navigate(`/album/${playlist?.id}`)}
                cover={
                  playlist.images && playlist.images.length > 0 ? (
                    <img src={playlist.images[0].url} alt={playlist.name} />
                  ) : null
                }
              >
                <Meta
                  title={<span className="meta-title">{playlist.name}</span>}
                  description={
                    <span className="description">
                      {playlist.release_date} ~~{" "}
                      {albumType === "album" ? "Album" : "Single"}
                    </span>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
        {/* // */}
        <div>
          <h1 style={{ color: "white", padding: "20px" }}>Fan cũng thích</h1>
          <div
            className="card-music-container"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            {related?.artists?.slice(0, 7).map((playlist) => (
              <Card
                className="card-music-page"
                key={playlist.id}
                onClick={() => navigate(`/artists/${playlist?.id}`)}
                cover={
                  playlist.images && playlist.images.length > 0 ? (
                    <img
                      style={{ borderRadius: "50%" }}
                      src={playlist.images[0].url}
                      alt={playlist.name}
                    />
                  ) : null
                }
              >
                <Meta
                  title={<span className="meta-title">{playlist.name}</span>}
                  description={
                    <span className="description">
                      <p style={{ color: "white" }}>{playlist.type}</p>
                    </span>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default ArtistsDetail;
