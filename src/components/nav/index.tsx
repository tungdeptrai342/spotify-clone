import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

interface Progs {
  items: MenuItem[];
  className?: string;
  selectedKeys?: string[]
}

type MenuItem = Required<MenuProps>["items"][number];
const NavComponent = ({ items,selectedKeys, className="" }: Progs) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  return (
    <div className={"sidebar-wrapper"}>
      <div>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[location.pathname]}
          mode="horizontal"
          items={items}
          className={className}
          selectedKeys={selectedKeys}
        />
      </div>
    </div>
  );
};
export default NavComponent;
