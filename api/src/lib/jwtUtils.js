import { Request } from 'express'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { IJwtUserPayload } from '../types/index.js'

export const getReqToken = (req) => {
  const { cookies, headers } = req
  if (cookies?.token) {
    return cookies.token
  }
  if (headers?.authorization?.split(' ')?.[0] === 'Bearer') {
    return headers.authorization.split(' ')[1]
  }
  return null
}
export const generateToken = (payload, secret) => sign(payload.toJSON(), secret, { expiresIn: '1d' })
export const decodeToken = (token, secret) => {
  if (token) {
    return verify(token, secret) 
  }
  return null
}
