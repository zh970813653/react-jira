import './wdyr'
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProviders } from "./context";
import "antd/dist/antd.less";

import { BrowserRouter } from "react-router-dom";
loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);