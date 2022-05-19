import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client";

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache()
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <CookiesProvider>
      <AppProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      </AppProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
