import React from "react";
import { useQuery } from "react-query";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { getAccessToken } from "../../config/accessToken";
import { FeaturedPlaylistsResponse, getPlaylists } from "../../services/getUsers";
import FooterComponent from "../../components/FooterComponent";
import "./index.css";
import { useNavigate } from "react-router-dom";

const MusicPage = () => {
  const { data: featuredPlaylists } = useQuery<FeaturedPlaylistsResponse, Error>(
    ["playlists"],
    getPlaylists,
    {
      enabled: !!getAccessToken(),
    }
  );

  const navigate = useNavigate()

  return (
    <div className="user-profile">
      <div className="card-music-container">
        {featuredPlaylists?.playlists.items.map((playlist) => (
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
              description={<span className="description">{playlist.description}</span>}
            />
          </Card>
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default MusicPage;