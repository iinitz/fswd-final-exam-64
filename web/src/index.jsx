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
  // credentials: 'include', // allow send cookies to api
  // headers: {
  //   Authorization: 'Bearer TOKEN',
  // }, // send token in headers
})

const root = ReactDOM.createRoot(
  document.getElementById('root'),
)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CookiesProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </CookiesProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
