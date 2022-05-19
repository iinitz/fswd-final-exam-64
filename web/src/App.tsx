import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

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
      <Route path="login" element={LoginPage}/>
      {/* WEB: Implement route /register element RegisterPage here */}
      <Route path="register" element={RegisterPage}/>
      {/* WEB: Implement route /feed element FeedPage here */}
      <Route path="feed" element={FeedPage}/>
      {/* WEB: Implement route /logout element LogoutPage here */}
      <Route path="logout" element={LogoutPage}/>
      {/* WEB: Implement route / element HomePage here */}
      <Route path="/" element={HomePage}/>
      {/* WEB: Implement route /:username element ProfilePage here */}
      <Route path="/:username" element={ProfilePage}/>
    </Routes>
  </Suspense>
)

export default App
