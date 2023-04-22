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
      <AppProviders>
        <DevTools />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>,
    document.getElementById("root")
  )
);
