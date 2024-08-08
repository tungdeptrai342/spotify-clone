import { Card, CardProps } from "antd";
import Meta from "antd/es/card/Meta";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { CSSProperties } from "react";
import { ReactNode } from "react";

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
}

const CardComponent = ({
  size = "default", // Đặt giá trị mặc định hợp lệ
  loading = false,
  className = "",
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
      className={className}
      extra={extra}
      bordered={bordered}
      cover={cover}
    >
      <Meta description={description} title={title} />
    </Card>
  );
};
export default CardComponent
