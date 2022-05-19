import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loading } from './components/Loading'

const FeedPage = lazy(() => import('./pages/FeedPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const LogoutPage = lazy(() => import('./pages/LogoutPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* WEB: Implement route /login element LoginPage here */}
      <Route path="/login">
        <LoginPage/>
      </Route>
      {/* WEB: Implement route /register element RegisterPage here */}
      <Route path="/register">
        <RegisterPage/>
      </Route>
      {/* WEB: Implement route /feed element FeedPage here */}
      <Route path="/feed">
        <FeedPage/>
      </Route>
      {/* WEB: Implement route /logout element LogoutPage here */}
      <Route path="/logout">
        <LogoutPage/>
      </Route>
      {/* WEB: Implement route / element HomePage here */}
      <Route path="/">
        <HomePage/>
      </Route>
      {/* WEB: Implement route /:username element ProfilePage here */}
      <Route path="/:username">
        <ProfilePage/>
      </Route>
    </Routes>
  </Suspense>
)

export default App
