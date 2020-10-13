import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import theme from "./themes/themes";

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ReactQueryCacheProvider queryCache={queryCache}>
            <App />
            <ReactQueryDevtools />
          </ReactQueryCacheProvider>
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
