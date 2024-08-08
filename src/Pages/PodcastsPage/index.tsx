import React, { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../../config/accessToken";
import {
  ApiDataType,
  getShows,
  getUser,
  ShowsResponse,
} from "../../services/getUsers";
import { useQuery } from "react-query";
import FooterComponent from "../../components/FooterComponent";
import "./index.css";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const PodcastPage = () => {
  const ids = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ";
  const { data: show } = useQuery<ShowsResponse, Error>(
    ["show", ids],
    () => getShows(ids),
    {
      enabled: !!getAccessToken(),
    }
  );

  return (
    <div className="user-profile">
      <div className="user-profile">
        <div className="card-music-container">
          {show?.shows.map((show) => (
            <Card
              className="card-music-page"
              key={show.id}
              cover={
                show.images && show.images.length > 0 ? (
                  <img src={show.images[0].url} alt={show.name} />
                ) : null
              }
            >
              <Meta
                title={<span className="meta-title">{show.name}</span>}
                description={
                  <span className="description">{show.description}</span>
                }
              />
            </Card>
          ))}
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};
export default PodcastPage;
