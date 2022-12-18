import React from "react";
import ReactDOM from "react-dom";
import "./wdyr.ts";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProviders } from "context";
import "antd/dist/antd.less";
import { Profiler } from "components/profiler";
// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(<App />);
loadServer(() =>
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <Profiler id="Root App" phases={["mount"]}>
        <App />
      </Profiler>
    </AppProviders>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
