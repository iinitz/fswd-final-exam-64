import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import "./index.css";

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <CookiesProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>
);
