import React, { useContext, useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { AuthContext, AuthContextType } from "../../Contex/AuthContext";

interface CustomBreadcrumbProps {
  items: {
    title: React.ReactNode;
    href?: string;
    key: string;
  }[];
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>("All");

  useEffect(() => {
    const currentItem = items.find((item) => item.href === location.pathname);
    if (currentItem) {
      setActiveKey(currentItem.key);
    }
  }, [location.pathname, items]);
  const handleClick = (item: { key: string; href?: string }) => {
    setActiveKey(item.key);
    if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <Breadcrumb
      style={{
        marginTop: "20px",
        color: "white",
        marginLeft: "24px",
        cursor: "pointer",
      }}
    >
      {items.map((item) => (
        <Breadcrumb.Item
          key={item.key}
          className={
            item.key === activeKey ? "breadcrumb-active" : "breadcrumb-item"
          }
          onClick={() => handleClick(item)}
        >
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
