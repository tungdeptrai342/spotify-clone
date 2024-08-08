import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigationHistory } from './customehoook';

const NavigationButtons = () => {
  const { canGoBack, canGoForward, goBack, goForward } = useNavigationHistory();

  return (
    <div>
      <LeftOutlined
        onClick={goBack}
        style={{
          color: canGoBack ? "white" : "gray",
          padding: "8px",
          fontSize: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginLeft: "10px",
          cursor: canGoBack ? "pointer" : "not-allowed",
        }}
      />
      <RightOutlined
        onClick={goForward}
        style={{
          color: canGoForward ? "white" : "gray",
          padding: "8px",
          fontSize: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginLeft: "10px",
          cursor: canGoForward ? "pointer" : "not-allowed",
        }}
      />
    </div>
  );
};

export default NavigationButtons;