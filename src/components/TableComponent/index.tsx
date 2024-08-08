import React, { HTMLAttributes, TdHTMLAttributes } from "react";
import { ConfigProvider, Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, DashOutlined, LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import {
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";

interface Props {
  columns: ColumnsType<any>;
  dataSource: any[];
  rowSelection?: TableRowSelection<any>;
  onRow?: (
    record: any,
    index?: string | number
  ) => HTMLAttributes<any> | TdHTMLAttributes<any>;
  onChange?: TableProps["onChange"];
  className?: string;
  rowKey?: string;
  rowClassName?: (record: any) => string | string;
  virtual?: boolean;
  scroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  };
  rowHoverable?: boolean;
  cellPaddingInline?: number;
  cellPaddingBlock?: number;
  headerBorderRadius?: number;
}

const TableComponent = ({
  className = "",
  columns,
  dataSource = [],
  onChange,
  rowKey,
  rowClassName,
  virtual = false,
  scroll = { x: 1366, y: 400 },
  rowSelection,
  onRow = () => {
    return {};
  },
  cellPaddingInline = 8,
  cellPaddingBlock = 8,
  headerBorderRadius = 8,
}: Props) => {
  // Add icons to the last column
  const modifiedColumns = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="action-icons">
          <PlusOutlined className="icon-plus" />
          <DashOutlined className="icon-dash" />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingInline: cellPaddingInline,
            cellPaddingBlock: cellPaddingBlock,
            headerBorderRadius: headerBorderRadius,
          },
        },
      }}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={modifiedColumns}
        className={`custom-table ${className}`}
        pagination={false}
        onChange={onChange}
        rowKey={rowKey}
        virtual={virtual}
        scroll={scroll}
        rowClassName={rowClassName}
        onRow={(record, index) => {
          return onRow?.(record, index);
        }}
        rowSelection={rowSelection}
      />
    </ConfigProvider>
  );
};

export default TableComponent;
