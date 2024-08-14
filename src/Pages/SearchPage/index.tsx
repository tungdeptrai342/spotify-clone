import React from "react";
import { useQuery } from "react-query";
import { ApiDataTypeCate, getCategories } from "../../services/getCategories";
import "./index.css"; // Ensure this import is present
import CardPlaylist from "../../components/CardPlaylist";
import FooterComponent from "../../components/FooterComponent";
import {
  SearchResponse,
  searchSpotify,
  TrackItem,
} from "../../services/search";
import { useSearch } from "../../Contex/searchContext";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const SearchPage = () => {
  const { searchQuery } = useSearch();
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery<ApiDataTypeCate[], Error>("categories", getCategories);

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useQuery<SearchResponse, Error>(
    ["searchResults", searchQuery],
    () => searchSpotify(searchQuery),
    {
      enabled: !!searchQuery,
    }
  );
  const navigate = useNavigate();

  const limitedCategoriesData = categoriesData?.slice(0, 20);

  return (
    <div className="user-profile">
      <h1>{searchQuery ? "Search Results" : "Browse all"}</h1>
      <div className="card-search-container">
        {searchQuery ? (
          <div className="card-artists-container" style={{ marginTop: "20px" }}>
            <div>
              <Link
                to={"/artists/search"}
                state={{ searchData }}
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textDecoration: "none",
                }}
              >
                Nghệ sĩ
              </Link>
            </div>
            <div style={{ display: "flex" }}>
              {searchData?.artists.items.slice(0, 5).map((artists) => (
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

            <div style={{ marginTop: "50px" }}>
              <Link
                to={"/album/search"}
                state={{ searchData }}
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textDecoration: "none",
                }}
              >
                Album
              </Link>

              <div style={{ display: "flex" }}>
                {searchData?.albums.items.slice(0, 5).map((artists) => (
                  <Card
                    onClick={() => navigate(`/album/${artists.id}`)}
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
                      description={artists.artists[0].name}
                    />
                  </Card>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "50px" }}>
              <Link
                to={"/playlist/search"}
                state={{ searchData }}
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textDecoration: "none",
                }}
              >
                Playlist
              </Link>

              <div style={{ display: "flex" }}>
                {searchData?.playlists.items.slice(0, 5).map((artists) => (
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

            <div style={{ marginTop: "50px" }}>
              <p
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                Track
              </p>

              <div style={{ display: "flex" }}>
                {searchData?.tracks.items.slice(0, 5).map((artists) => (
                  <Card
                    style={{ marginRight: "10px" }}
                    className="card-playlist"
                    key={artists.id}
                    cover={
                      artists.album.images &&
                      artists.album.images.length > 0 ? (
                        <img
                          style={{
                            width: "218px",
                            height: "218px",
                            padding: "8px",
                          }}
                          src={artists.album.images[0].url}
                          alt={artists.name}
                        />
                      ) : null
                    }
                  >
                    <Meta
                      style={{ width: "218px" }}
                      title={<span className="meta-title">{artists.name}</span>}
                      description={artists.artists[0].name}
                    />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          limitedCategoriesData?.map((category) => (
            <CardPlaylist
              key={category.id}
              cover={category.icons[0].url}
              title={category.name}
            />
          ))
        )}
      </div>
      <FooterComponent />
    </div>
  );
};

export default SearchPage;
