import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import "./style.css";
import React, { FC, ReactNode } from "react";

export interface Progs {
  children?: string | JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void | FC;
  btnType?:
    | "danger"
    | "info"
    | "success"
    | "warn"
    | "dark"
    | "save-draft"
    | "create"
    | "back"
    | "cancel"
    | "primary"
    | "default"
    | "go-back";
  icon?: ReactNode;
  style?: React.CSSProperties;
  size?: SizeType;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

const ButtonComponent: FC<Progs> = ({
  children = "",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  size = "large",
  btnType = "default",
  icon,
  style = {},
  htmlType,
}: Progs) => {
  // Map custom btnType to Ant Design Button type
  const getButtonType = (btnType: string): "default" | "primary" | "dashed" | "text" | "link" | undefined => {
    switch (btnType) {
      case "danger":
        return "default"; // Customize as per your styling
      case "info":
        return "default"; // Customize as per your styling
      case "success":
        return "default"; // Customize as per your styling
      case "warn":
        return "default"; // Customize as per your styling
      case "dark":
        return "default"; // Customize as per your styling
      case "save-draft":
        return "default"; // Customize as per your styling
      case "create":
        return "default"; // Customize as per your styling
      case "back":
        return "default"; // Customize as per your styling
      case "cancel":
        return "default"; // Customize as per your styling
      case "primary":
        return "primary";
      case "default":
        return "default";
      case "go-back":
        return "default"; // Customize as per your styling
      default:
        return "default";
    }
  };

  return (
    <Button
      type={getButtonType(btnType)}
      loading={loading}
      disabled={disabled}
      className={className}
      onClick={onClick}
      icon={icon}
      size={size}
      htmlType={htmlType}
      style={style}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
