import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

import LoginPage from './pages/LoginPage'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(
  document.getElementById('root'),
)
root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <ApolloProvider client={client}>
      <CookiesProvider>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </CookiesProvider>
    </ApolloProvider>
    
  </React.StrictMode>,
)
