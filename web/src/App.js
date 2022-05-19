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
      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      {/* WEB: Implement route /register element RegisterPage here */}
      <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
      {/* WEB: Implement route /feed element FeedPage here */}
      {/* WEB: Implement route /logout element LogoutPage here */}
      {/* WEB: Implement route / element HomePage here */}
      {/* WEB: Implement route /:username element ProfilePage here */}
    </Routes>
  </Suspense>
)

export default App
