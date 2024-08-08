import React, { Suspense } from "react";
import { Spin, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

const NotFoundLayout = () => {
  return (
    <ConfigProvider>
      <div className={"example-layout"}>
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </ConfigProvider>
  );
};

export default NotFoundLayout;
