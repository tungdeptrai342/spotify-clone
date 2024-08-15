import React from "react";
import { SpotifyOutlined } from "@ant-design/icons";
import ButtonIconComponent from "../../components/ButtonIcon";
import "./index.css";

const initiateSpotifyLogin = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const scopes =
    "user-read-private user-read-email user-library-read user-follow-read user-top-read user-follow-modify user-follow-read playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private ugc-image-upload";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = authUrl;
};

const Login = () => {
  const handleSpotifyLogin = () => {
    initiateSpotifyLogin();
  };

  return (
    <div className="login-container">
      <div className="login-header-content">
        <SpotifyOutlined
          style={{
            fontSize: "35px",
            color: "white",
            marginTop: "30px",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        />
        <ButtonIconComponent
          icon={<SpotifyOutlined style={{ fontSize: "25px" }} />}
          style={{
            marginTop: "10px",
            backgroundColor: "#1DB954",
            color: "white",
          }}
          onClick={handleSpotifyLogin}
        >
          Continue with Spotify
        </ButtonIconComponent>
      </div>
    </div>
  );
};

export default Login;
