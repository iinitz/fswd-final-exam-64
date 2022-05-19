import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '../components/ErrorMessage'
import { LandingPageLayout } from '../components/Layout/LandingPageLayout'
/* import { useApp } from '../contexts/AppContext' */

/* import './LoginPage.css' */

const LoginPage = () => {
  const navigate = useNavigate()
  /* const { login } = useApp() */
  // WEB: Implement username and password state here
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // WEB: Implement handleUsernameChange and handlePasswordChange here
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        setError('')
        /* await login(username, password) */
        navigate('/feed')
      } catch (err) {
        setError((err).message)
      }
    },
    [/* login */, /* username */, /* password */, navigate],
  )
  return (
    <div class="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username-input">
          Username
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            data-testid="username-input"
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </label>
        <ErrorMessage message={error} />
        <button
          type="submit"
          data-testid="login-button"
          disabled={username === '' || password === ''}
        >
          Login
        </button>
      </form>
      <p>or</p>
      <Link to="/register">
        <button className="button-outlined" type="button" data-testid="register-button">Register</button>
      </Link>
    </div>
  )
}

export default LoginPage
