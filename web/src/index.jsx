import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const root = ReactDOM.createRoot(
  document.getElementById('root'),
)
root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <BrowserRouter>
      <CookiesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
