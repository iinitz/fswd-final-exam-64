import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  // credentials: 'include',
  // Allow apollo client send cookie to api
  // headers: {
  //   Authorization: 'Bearer TOKEN',
  // }
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* WEB: Implement ApolloProvider and BrowserRouter here */}
      <CookiesProvider>
        <AppProvider>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </AppProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
