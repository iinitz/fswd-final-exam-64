import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ReactDOM from 'react-dom/client'

import App from './App'
import { AppProvider } from './contexts/AppContext'
import './index.css'
import SessionProvider from 'react-session-provider';

// // WEB: Implement apoloClient using uri from process.env.REACT_APP_GRAPHQL_URI here
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// )
// root.render(
//   <React.StrictMode>
//     {/* WEB: Implement ApolloProvider and BrowserRouter here */}
//     <CookiesProvider>
//       <AppProvider>
//         <App />
//       </AppProvider>
//     </CookiesProvider>
//   </React.StrictMode>,

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
})

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
      <ApolloProvider client={client}>
        <SessionProvider>
          <App />
        </SessionProvider>
      </ApolloProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,

  document.getElementById('root'),
)
