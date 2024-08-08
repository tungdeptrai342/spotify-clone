import { Card, CardProps } from "antd";
import Meta from "antd/es/card/Meta";
import { ReactNode, CSSProperties } from "react";
import "./index.css";
import React from "react";

interface Progs {
  size?: CardProps["size"];
  loading?: boolean;
  className?: string;
  extra?: ReactNode;
  bordered?: boolean;
  cover?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
  style?: CSSProperties;
  onClick?: ()=> void
}

const CardXL = ({
  size = "default",
  loading = false,
  className = "card-xl",
  extra,
  bordered = false,
  cover,
  description,
  title,
  style,
  onClick,
}: Progs) => {
  return (
    <Card
      size={size}
      loading={loading}
      className={className}
      extra={extra}
      bordered={bordered}
      cover={cover}
      style={style}
      onClick={onClick}
    >
      <Meta description={description} title={title} />
    </Card>
  );
};

export default CardXL;
