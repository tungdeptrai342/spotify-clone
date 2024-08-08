import React, { Suspense } from "react";
import { Spin, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import "./index.css"

const ContentLayout = () => {
  return (
    <ConfigProvider>
      <div className={"login-layout"}>
        Đây là content
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </ConfigProvider>
  );
};

export default ContentLayout;
