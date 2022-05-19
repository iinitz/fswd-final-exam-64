/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { gql } from '@apollo/client'
import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '../components/ErrorMessage'
import { LandingPageLayout } from '../components/Layout/LandingPageLayout'
import { ICreateOneUserInput } from '../types'

import './RegisterPage.css'

// WEB: Implement register mutation here
// mutation($record: CreateOneUserInput!){
//   createUser(record: $record)
//   {
//     recordId
//   }
// }
const REGISTER_MUTATION = gql`
mutation($record: CreateOneUserInput!){
  register(record: $record)
  {
    recordId
  }
}`

const RegisterPage = () => {
  const navigate = useNavigate()
  // WEB: Implement fullname, username and password state here
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  // WEB: Implement useMutation for registerMutation here
  const [registerMutation] = useMutation(REGISTER_MUTATION)
  // WEB: Implement handleFullnameChange, handleUsernameChange and handlePasswordChange here
  const handleFullnameChange = (value: string) => {
    setFullname(value)
  }
  const handleUsernameChange = (value: string) => {
    setUsername(value)
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      const record: ICreateOneUserInput = {
        fullname,
        username,
        password,
      }
      try {
        setError('')
        const { data: registerData } = await registerMutation({ variables: { record } })
        if (registerData?.register?.recordId) {
          navigate('/login')
        }
      } catch (err) {
        if ((err).message.startsWith('E11000')) {
          setError(`Duplicate username ${username}`)
        } else {
          setError('Server error')
        }
      }
    },
    [fullname, navigate, password, registerMutation, username],
  )
  return (
    <LandingPageLayout>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fullname-input">
          Fullname
          <input
            id="fullname-input"
            type="text"
            value={fullname}
            onChange={(val) => handleFullnameChange(val.target.value)}
            data-testid="fullname-input"
          />
        </label>
        <label htmlFor="username-input">
          Username
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(val) => handleUsernameChange(val.target.value)}
            data-testid="username-input"
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(val) => handlePasswordChange(val.target.value)}
            data-testid="password-input"
          />
        </label>
        <ErrorMessage message={error} />
        <button
          type="submit"
          data-testid="register-button"
          disabled={fullname === '' || username === '' || password === '' || ['login', 'logout', 'register', 'feed'].includes(username)}
        >
          Register
        </button>
      </form>
      <p>or</p>
      <Link to="/login">
        <button className="button-outlined" type="button" data-testid="login-button">Login</button>
      </Link>
    </LandingPageLayout>
  )
}

export default RegisterPage
