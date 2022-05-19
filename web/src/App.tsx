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
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/feed' element={<FeedPage />}></Route>
      <Route path='/logout' element={<LogoutPage />}></Route>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/:username' element={<ProfilePage />}></Route>
    </Routes>
  </Suspense>
)

export default App
