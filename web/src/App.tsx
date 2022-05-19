import { lazy, Suspense } from 'react'
import { Routes } from 'react-router-dom'

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
      <LoginPage/>
      {/* WEB: Implement route /register element RegisterPage here */}
      <RegisterPage/>
      {/* WEB: Implement route /feed element FeedPage here */}
      <FeedPage/>
      {/* WEB: Implement route /logout element LogoutPage here */}
      <LogoutPage/>
      {/* WEB: Implement route / element HomePage here */}
      <HomePage/>
      {/* WEB: Implement route /:username element ProfilePage here */}
      <ProfilePage/>
    </Routes>
  </Suspense>
)

export default App
