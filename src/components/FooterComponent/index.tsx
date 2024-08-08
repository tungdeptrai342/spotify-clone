import React from "react";
import "./index.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";

const FooterComponent = () => {
  return (
    <div style={{ marginTop: "90px" }}>
      <div className="footer-container">
        <div className="col-8">
          <ul style={{ listStyleType: "none" }}>
            <li style={{ color: "white", fontWeight: "800", fontSize: "22px" }}>
              Company
            </li>
            <li>About</li>
            <li>Jobs</li>
            <li>For the Record</li>
          </ul>
        </div>
        <div className="col-2">
          <ul>
            <li style={{ color: "white", fontWeight: "800", fontSize: "22px" }}>
              Communities
            </li>
            <li>For Artists</li>
            <li>Developers</li>
            <li>Advertising</li>
            <li>Investors</li>
            <li>Vendors</li>
          </ul>
        </div>
        <div className="col-3">
          <ul>
            <li style={{ color: "white", fontWeight: "800", fontSize: "22px" }}>
              Useful links
            </li>
            <li>Support</li>
            <li>Free Mobile App</li>
          </ul>
        </div>
        <div className="col-4">
          <ul>
            <li style={{ color: "white", fontWeight: "800", fontSize: "22px" }}>
              Spotify Plans
            </li>
            <li>Premium Individual</li>
            <li>Premium Duo</li>
            <li>Premium Family</li>
            <li>Premium Student</li>
            <li>Audiobooks Access</li>
          </ul>
        </div>
        <div className="col-5">
          <div style={{ display: "flex" }}>
            <InstagramOutlined
              className="iconHover"
              style={{
                height: "40px",
                width: "40px",
                color: "white",
                justifyContent: "center",
                backgroundColor: "#292929",
                marginLeft: "10px",
                borderRadius: "50%",
              }}
            />
            <TwitterOutlined
              className="iconHover"
              style={{
                height: "40px",
                width: "40px",
                color: "white  ",
                justifyContent: "center",
                backgroundColor: "#292929",
                marginLeft: "10px",
                borderRadius: "50%",
              }}
            />
            <FacebookOutlined
              className="iconHover"
              style={{
                height: "40px",
                width: "40px",
                color: "white ",
                justifyContent: "center",
                backgroundColor: "#292929",
                marginLeft: "10px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "white", marginTop: "70px" }}>
        <Divider style={{ color: "white" }} />
      </div>

      <div className="footer-more-container">
        <div className="footer-more-col-1">
          <p>Legal</p>
          <p>Safety & Privacy Center</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
          <p>About Ads</p>
          <p>Accessibility</p>
          <p>Notice at Collection</p>
          <p>Your Privacy Choices</p>
        </div>
        <div className="footer-more-col-2">
          <span>© 2024 Spotify AB</span>
        </div>
      </div>
    </div>
  );
};
export default FooterComponent;
