import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();
    const handleOnclick = () => {
      navigate("/");
    };
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={handleOnclick}>Back Home</Button>}
      />
    </div>
  );
};
export default NotFound;
