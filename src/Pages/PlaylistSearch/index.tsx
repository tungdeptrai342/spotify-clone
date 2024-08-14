import { Button, Card, Result } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
const PlaylistSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchData } = location.state || {};
  return (
    <div className="user-profile">
      <div className="card-artists-container">
        <h1 style={{ color: "white" }}>Album</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchData?.playlists.items.map((artists) => (
            <Card
              onClick={() => navigate(`/playlist/${artists.id}`)}
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
        <FooterComponent></FooterComponent>
      </div>
    </div>
  );
};
export default PlaylistSearch;
