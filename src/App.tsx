import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import Routers from "./Routes";
import "./style.css";
import { store } from "./Redux";

function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  return (
    <Provider store={store}>
      <ConfigProvider>
        <Routers />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
