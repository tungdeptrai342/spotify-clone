import React, { Suspense } from "react";
import { Spin, ConfigProvider, Divider } from "antd";
import ButtonIconComponent from "../../components/ButtonIcon";
import CardComponent from "../../components/Card";
import { SpotifyFilled, HomeFilled, SearchOutlined } from "@ant-design/icons";
import CardPlaylist from "../../components/CardPlaylist";
import NavComponent from "../../components/nav";
import { Outlet } from "react-router-dom";
import Slidebar from "../../components/Sidebar";
import "./index.css";
import ButtonComponent from "../../components/button";
import CardXL from "../../components/CardXL";
import Meta from "antd/es/card/Meta";
import TableComponent from "../../components/TableComponent";

const ExampleLayout = () => {
  const items = [
    {
      key: "sub1",
      label: <SpotifyFilled />,
    },
    {
      key: "sub2",
      label: <HomeFilled />,
    },
    {
      key: "sub4",
      label: <SearchOutlined />,
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  
  const cover = (
    <img
      alt="example"
      src="https://via.placeholder.com/150"
      style={{ width: "150px", height: "150px" }}
    />
  );
  return (
    <ConfigProvider>
      <div className={"example-layout"}>
        <Slidebar items={items} />
        <CardComponent
          title="Card Title"
          style={{ width: 200, height: 200 }}
          description="This is the description"
          bordered={true}
          cover={
            <div>
              <img
                alt="example"
                src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhat--Dem-Sai-G.jpg"
                style={{ width: 100, height: 100 }}
              />
              <p>
                {" "}
                <Meta></Meta>
              </p>
            </div>
          }
        />
        <div style={{ padding: "20px" }}>
          <CardXL
            title="Card Title"
            description="This is the description"
            cover={cover}
            style={{ width: "400px" }}
          />
        </div>
        <ButtonIconComponent>Đăng kí</ButtonIconComponent>
        <NavComponent items={items} />
        <ButtonComponent children={"Helloo"} />
        <CardPlaylist />

        <TableComponent columns={columns} dataSource={data} />

          <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </ConfigProvider>
  );
};

export default ExampleLayout;
