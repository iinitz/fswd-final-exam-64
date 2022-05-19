import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient } from '@apollo/client'


import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'

// WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
const rootElement = document.getElementById("root");

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});
root.render(
  <React.StrictMode>
    {/* WEB: Implement ApolloProvider and BrowserRouter here */}
    <ApolloProvider client={client}><CookiesProvider>
      
      <AppProvider>
        <App />
      </AppProvider>
      
    </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
