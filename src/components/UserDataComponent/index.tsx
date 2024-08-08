import React from "react";
import { Menu, Dropdown, Col, MenuProps, Divider } from "antd";
import { Link } from "react-router-dom";
import PopoverComponent from "../Popover";
import { useQuery } from "react-query";
import { ApiDataType, getUser } from "../../services/getUsers";
import "./index.css";

const UserAvatarDropdown = () => {
  const userId = "31kgeh75edzsu6zoftj3lwpiq4ye"; // Hardcoded user_id

  const { data } = useQuery<ApiDataType, Error>(["user", userId], () =>
    getUser(userId)
  );
  const handleLogout = () => {
    // Handle Log out button click
    localStorage.removeItem("spotifyToken");
    window.location.reload(); // Optionally reload page or redirect
  };
  const menuItems: MenuProps["items"] = [
    {
      label: <p style={{ color: "white" }}>Account</p>,
      key: "0",
    },
    {
      label: (
        <Link to="/profile">
          <p style={{ color: "white" }}>Profile</p>
        </Link>
      ),
      key: "1",
    },
    {
      label: <p style={{ color: "white" }}>Upgrade to Premium</p>,
      key: "2",
    },
    {
      label: <p style={{ color: "white" }}>Settings</p>,
      key: "3",
    },

    {
      label: <p style={{ color: "white" }}>Log out</p>,
      key: "5",
      onClick: (handleLogout)
    },
  ];

  return (
    <Col span={1} className="col-1">
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <div className="avatar-user" style={{ cursor: "pointer" }}>
          <img
            src={data?.images?.[0]?.url}
            style={{ height: "24px", width: "24px", borderRadius: "50%" }}
          />
        </div>
      </Dropdown>
    </Col>
  );
};

export default UserAvatarDropdown;
