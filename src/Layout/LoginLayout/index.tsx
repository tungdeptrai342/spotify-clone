import React, { Suspense } from "react";
import { Spin, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import "./index.css"

const LoginLayout = () => {
  return (
    <ConfigProvider>
      <div className={"login-layout"}>
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </ConfigProvider>
  );
};

export default LoginLayout;
