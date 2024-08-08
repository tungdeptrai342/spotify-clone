import { Card, CardProps } from "antd";
import Meta from "antd/es/card/Meta";
import React, { CSSProperties, ReactNode } from "react";
import "./index.css";

interface Progs {
  size?: CardProps["size"];
  loading?: boolean;
  className?: string;
  extra?: ReactNode;
  bordered?: boolean;
  cover?: string; // Change to accept image URL
  description?: ReactNode;
  title?: ReactNode;
  style?: CSSProperties;
}

const CardPlaylist = ({
  size = "default",
  loading = false,
  extra,
  bordered = false,
  cover,
  description,
  title,
}: Progs) => {
  return (
    <Card
      size={size}
      loading={loading}
      className={"card-playlist"}
      extra={extra}
      bordered={bordered}
      cover={
        cover && (
          <div className="cover-container">
            <img src={cover} alt="cover" className="cover-image" />
            <div className="cover-title">{title}</div>
          </div>
        )
      }
      >
      <Meta description={description} />
    </Card>
  );
};
export default CardPlaylist;
