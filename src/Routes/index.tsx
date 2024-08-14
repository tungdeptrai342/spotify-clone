import React from "react";
import MainLayout from "../Layout/MainLayout";
import ExampleLayout from "../Layout/ExampleLayout";
import Main from "../Pages/Main";
import LoginLayout from "../Layout/LoginLayout";
import NotFoundLayout from "../Layout/NotFoundLayout";
import NotFound from "../Pages/NotFound";
import AudioPage from "../Pages/AudioPage";
import PodcastPage from "../Pages/PodcastsPage";
import MusicPage from "../Pages/MusicPage";
import Login from "../Pages/Login";
import Example from "../Pages/Example";
import SearchPage from "../Pages/SearchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileUser from "../Pages/ProfileUser";
// import PlaylistDetails from "../Pages/playlistDetaits";
import AlbumDetail from "../Pages/AlbumDetailsPage";
import ArtistsDetails from "../Pages/ArtistDetails";
import PlaylistDetails from "../Pages/playlistDetaits";
import ArtistsSearch from "../Pages/ArtistsSearch";
import AlbumSearch from "../Pages/Albumsearch";
import PlaylistSearch from "../Pages/PlaylistSearch";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/music",
          element: <MusicPage />,
        },
        {
          path: "/podcasts",
          element: <PodcastPage />,
        },
        {
          path: "/audio",
          element: <AudioPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/profile",
          element: <ProfileUser />,
        },
        {
          path: "/playlist/:playlistId",
          element: <PlaylistDetails />,
        },
        {
          path: "/album/:id",
          element: <AlbumDetail />,
        },
        {
          path: "/artists/:id",
          element: <ArtistsDetails />,
        },
        {
          path: "/artists/search",
          element: <ArtistsSearch />,
        },
        {
          path: "/album/search",
          element: <AlbumSearch />,
        },
        {
          path:"/playlist/search",
          element: <PlaylistSearch />
        }
      ],
    },
    {
      element: <ExampleLayout />,
      children: [
        {
          path: "/example",
          element: <Example />,
        },
      ],
    },
    {
      element: <NotFoundLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      element: <LoginLayout />,
      children: [
        {
          path: "/Login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const Routers = () => <RouterComponent />;

export default Routers;
