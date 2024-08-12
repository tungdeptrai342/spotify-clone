import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import Routers from "./Routes";
import "./style.css";
import { store } from "./Redux";
import { AuthProvider } from "./Contex/AuthContext";
import NavigationButtons from "./components/navigationComponent";
import { Router } from "react-router-dom";
import { SearchProvider } from "./Contex/searchContext";
import SearchInput from "./components/SearchComponent";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <Routers />
      </ConfigProvider>
     
    </Provider>
  );
}

export default App;
