import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Slidebar from "../../components/Sidebar";
import ButtonComponent from "../../components/button";
import PopoverComponent from "../../components/Popover";
import {
  Spin,
  ConfigProvider,
  Row,
  Col,
  Card,
  Form,
  MenuProps,
  Dropdown,
  Menu,
} from "antd";
import CardComponent from "../../components/Card";
import "./index.css";
import {
  GlobalOutlined,
  HomeFilled,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  SpotifyFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import InputComponent from "../../components/InputComponent";
import { useQuery } from "react-query";
import {
  ApiDataType,
  getUser,
  getUserPlaylists,
  getUserSavedAlbums,
  PlaylistsResponse,
  SavedAlbumsResponse,
} from "../../services/getUsers";
import Meta from "antd/es/card/Meta";
import CustomBreadcrumb from "../../components/BreadcrumpComponent";
import { useLocation } from "react-router-dom";
import {
  getAccessToken,
  getTokenFromUrl,
  setAccessToken,
} from "../../config/accessToken";
import UserAvatarDropdown from "../../components/UserDataComponent";
import NavigationButtons from "../../components/navigationComponent";
import { useApiContext } from "../../Contex";
import SearchInput from "../../components/SearchComponent";
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const token = getAccessToken(); // Get token from local storage

  const location = useLocation();

  const breadcrumbPaths = ["/", "/music", "/podcasts", "/audio"];

  const inputPaths = ["/search"];

  const handleOnclick = () => {
    navigate("/Login");
  };

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setAccessToken(token);
      window.location.hash = ""; // Clear hash
    }
  }, []);

  const { savedAlbumsData, setSavedAlbumsData, userPlaylist, setUserPlaylist } =
    useApiContext();
  interface FormFields {
    search: string;
  }
  const breadcrumbItems = [
    {
      title: "All",
      key: "All",
      href: "/",
    },
    {
      title: "Music",
      key: "Music",
      href: "/music",
    },
    {
      title: "Podcasts",
      key: "Podcasts",
      href: "/podcasts",
    },
    {
      title: "Audiobooks",
      key: "Audio",
      href: "/audio",
    },
  ];

  const userId = "31kgeh75edzsu6zoftj3lwpiq4ye"; // Set cứng user_id

  useQuery<PlaylistsResponse, Error>(
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

  const items = [
    ...(token
      ? []
      : [
          {
            key: "sub1",
            label: (
              <div style={{ color: "white", fontWeight: 700, fontSize: 17 }}>
                <SpotifyFilled style={{ fontSize: "25px" }} /> Spotify
              </div>
            ),
          },
        ]),
    {
      key: "sub2",
      label: (
        <div style={{ color: "white", fontWeight: 700, fontSize: 17 }}>
          <HomeFilled style={{ fontSize: "25px" }} />{" "}
          <Link to={"/"} style={{ marginLeft: "20px" }}>
            Home
          </Link>
        </div>
      ),
    },
    {
      key: "search",
      label: (
        <div style={{ color: "white", fontWeight: 700, fontSize: 17 }}>
          <SearchOutlined style={{ fontSize: "25px" }} />{" "}
          <Link to={"/search"} style={{ marginLeft: "20px" }}>
            Search
          </Link>
        </div>
      ),
    },
  ];
  const [form] = Form.useForm<FormFields>();

  return (
    <ConfigProvider>
      <div className={"main-layout"}>
        <div className={"slide-bar-container"}>
          <Slidebar items={items} className="slide-bar-head" />
          <div className="library">
            <div className={"library-container"} style={{ color: "white" }}>
              <div className="header-library-title">
                <PopoverComponent
                  content={() => (
                    <>
                      <p>Collapse your library</p>
                    </>
                  )}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <UnorderedListOutlined style={{ fontSize: "23px" }} />
                    <p style={{ fontSize: "18px", marginLeft: "12px" }}>
                      Your Library
                    </p>
                  </div>
                </PopoverComponent>
              </div>
              <div className="header-library-plus">
                <PopoverComponent
                  content={() => (
                    <>
                      <p>Create playlist or folder</p>
                    </>
                  )}
                >
                  <PlusOutlined
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                    className="plus-icon"
                  />
                </PopoverComponent>
              </div>
            </div>

            <div className="card-libary">
              {!token ? (
                <>
                  <CardComponent
                    className="card"
                    title={
                      <p style={{ color: "white", fontWeight: 700 }}>
                        Create your first playlist
                      </p>
                    }
                    style={{ width: "auto", height: "auto" }}
                    description={
                      <div>
                        <p style={{ color: "white", fontWeight: 400 }}>
                          It's easy, we'll help you
                        </p>
                        <ButtonComponent
                          style={{
                            marginTop: "19px",
                            color: "black",
                            fontWeight: 700,
                            height: "32px",
                          }}
                          className="button-card"
                        >
                          Create playlist
                        </ButtonComponent>
                      </div>
                    }
                  />
                  <CardComponent
                    className="card"
                    title={
                      <p style={{ color: "white", fontWeight: 700 }}>
                        Let's find some podcasts to follow
                      </p>
                    }
                    style={{ width: "auto", height: "auto" }}
                    description={
                      <div>
                        <p style={{ color: "white", fontWeight: 400 }}>
                          We'll keep you updated to new episodes
                        </p>
                        <ButtonComponent
                          style={{
                            marginTop: "19px",
                            color: "black",
                            fontWeight: 700,
                            height: "32px",
                          }}
                          className="button-card"
                        >
                          Browse podcasts
                        </ButtonComponent>
                      </div>
                    }
                  />
                </>
              ) : (
                <>
                  {userPlaylist?.items.map((playlist) => (
                    <Card
                      className="card-playlist"
                      key={playlist.id}
                      onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                      <Meta
                        className="meta-playlist"
                        style={{ color: "white" }}
                        title={playlist.name}
                        description={`Total Tracks: ${playlist.tracks.total}`}
                        avatar={
                          playlist.images && playlist.images.length > 0 ? (
                            <img
                              style={{ width: "48px", height: "48px" }}
                              src={playlist.images[0].url}
                              alt={playlist.name}
                            />
                          ) : null
                        }
                      />
                    </Card>
                  ))}
                  {savedAlbumsData?.items.map(({ album }) => (
                    <Card
                      className="card-playlist"
                      key={album.id}
                      onClick={() => navigate(`/album/${album.id}`)}
                    >
                      <Meta
                        className="meta-playlist"
                        style={{ color: "white" }}
                        title={album.name}
                        description={`Total Tracks: ${
                          album.total_tracks
                        }, Artists: ${album.artists
                          .map((artist) => artist.name)
                          .join(", ")}`}
                        avatar={
                          album.images && album.images.length > 0 ? (
                            <img
                              style={{ width: "48px", height: "48px" }}
                              src={album.images[0].url}
                              alt={album.name}
                            />
                          ) : null
                        }
                      />
                    </Card>
                  ))}
                </>
              )}
            </div>

            <div className="footer-libary" style={{ color: "#B3B3B3" }}>
              <Row gutter={[8, 16]}>
                <Col span={4}>
                  <a href="">Legal</a>
                </Col>
                <Col span={8}>
                  <a href="">Safely & Privacy Center</a>{" "}
                </Col>
                <Col span={6}>
                  <a href="">Privacy Policy</a>
                </Col>
                <Col span={6}>
                  <a href="">Cookies</a>{" "}
                </Col>
              </Row>

              <Row gutter={[4, 4]} style={{ marginTop: "11px" }}>
                <Col span={4}>
                  <a href="">About Ads</a>{" "}
                </Col>
                <Col span={4}>
                  <a href="">Accessibility</a>{" "}
                </Col>
              </Row>
              <Row gutter={[4, 4]} style={{ marginTop: "11px" }}>
                <Col span={4}>
                  <a href="">Cookies</a>{" "}
                </Col>
              </Row>
              <div className="footer-button">
                <ButtonComponent
                  className="button-card"
                  style={{
                    marginTop: "28px",
                    marginBottom: "49px",
                    color: "white",
                    fontWeight: 700,
                    height: "32px",
                    backgroundColor: "#121212",
                  }}
                >
                  <GlobalOutlined />
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
        <div className={"slide-bar-content"}>
          <Row
            justify={"space-between"}
            className="row-content"
            align={"middle"}
          >
            <Col span={10} className="col-1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <NavigationButtons />
                <div>
                  <Col span={4}>
                    {inputPaths.includes(location.pathname) && (
                      <SearchInput></SearchInput>
                    )}
                  </Col>
                </div>
              </div>
            </Col>
            {!token ? (
              <Col span={6} className="col-1">
                <ButtonComponent
                  size="large"
                  onClick={handleOnclick}
                  className="button-sign-up"
                >
                  Sign up
                </ButtonComponent>
                <ButtonComponent
                  size="large"
                  onClick={handleOnclick}
                  className="button-login"
                >
                  Log in
                </ButtonComponent>
              </Col>
            ) : (
              <Col span={2} className="col-1">
                <UserAvatarDropdown />
              </Col>
            )}
          </Row>

          {breadcrumbPaths.includes(location.pathname) && (
            <CustomBreadcrumb items={breadcrumbItems} />
          )}

          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
