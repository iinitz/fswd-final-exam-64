import React, { Fragment, Suspense } from 'react'
// import { lazy, Suspense } from 'react'
import { Switch, Routes } from 'react-router-dom'

import { Loading } from './components/Loading'


const FeedPage = React.lazy(() => import('./pages/FeedPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const LogoutPage = React.lazy(() => import('./pages/LogoutPage'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))

const App = () => (
  // <Suspense fallback={<Loading />}>
  //   <Routes>
  //     {/* WEB: Implement route /login element LoginPage here */}
  //     {/* WEB: Implement route /register element RegisterPage here */}
  //     {/* WEB: Implement route /feed element FeedPage here */}
  //     {/* WEB: Implement route /logout element LogoutPage here */}
  //     {/* WEB: Implement route / element HomePage here */}
  //     {/* WEB: Implement route /:username element ProfilePage here */}
  //   </Routes>
  // </Suspense>

  <Fragment>
    <div className="App-page">
      <div className="App-content">
        <Suspense fallback="Loading ...">
          <Switch>
            <Routes path="/" exact>
              <FeedPage />
            </Routes>
            <Routes path="/login">
              <LoginPage />
            </Routes>
            <Routes path="/register">
              <LoginPage />
            </Routes>
          </Switch>
        </Suspense>
      </div>
    </div>
  </Fragment>
)

export default App
