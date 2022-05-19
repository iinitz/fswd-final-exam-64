import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
  credentials: 'include',
})

root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
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
