import { UnorderedListOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { ReactNode } from "react";

interface Props {
  title?: string;
  content?: ReactNode | (() => ReactNode);
  children: ReactNode; // Thêm thuộc tính children
  titleMinWidth?: number
  zIndexPopup?: number	
}

const PopoverComponent = ({ title, content, children }: Props) => {
  const renderContent = () => {
    if (typeof content === "function") {
      return content();
    }
    return content;
  };

  return (
    <Popover title={title} content={renderContent()}>
      {children} {/* Sử dụng children */}
    </Popover>
  );
};

export default PopoverComponent;
