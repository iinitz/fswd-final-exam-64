import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

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
  <BrowserRouter>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <CookiesProvider>
    <ApolloProvider client={client}>
      <AppProvider>
        <App />
      </AppProvider>
      </ApolloProvider>
    </CookiesProvider>
  </BrowserRouter>,
)
