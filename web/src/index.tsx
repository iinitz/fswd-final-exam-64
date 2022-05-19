import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
  credentials: 'include', // allow send cookies to api
  // headers: {
  //   Authorization: 'Bearer TOKEN',
  // }, // send token in headers
})

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <ApolloProvider client={client}>
      <CookiesProvider>
        <AppProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProvider>
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
