import { Menu, MenuProps } from "antd";
import { useLocation } from "react-router-dom";
import "./index.css";
import React from "react";

interface Progs {
  items: MenuItem[];
  className?: string;
}

type MenuItem = Required<MenuProps>["items"][number];

const Slidebar = ({ items, className = "" }: Progs) => {
  const location = useLocation();

  return (
    <div className={"sidebar-wrapper"}>
      <div>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className={className}
        />
      </div>
    </div>
  );
};

export default Slidebar;
