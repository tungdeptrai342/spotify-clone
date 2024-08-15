import React, { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../../config/accessToken";
import { ApiDataType, AudiobooksResponse, getAudiobookds, getUser } from "../../services/getUsers";
import { useQuery } from "react-query";
import "./index.css";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import FooterComponent from "../../components/FooterComponent";

const AudioPage = () => {
  const audiobooksId = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe";
  const { data: ids } = useQuery<AudiobooksResponse, Error>(
    ["audiobooks", audiobooksId],
    () => getAudiobookds(audiobooksId),
    {
      enabled: !!getAccessToken(),
    }
  );

  return <div className="user-profile">
     <div className="user-profile">
        <div className="card-music-container">
          {ids?.audiobooks.map((show) => (
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
  </div>;
};
export default AudioPage;
