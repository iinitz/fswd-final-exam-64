import bcrypt from 'bcrypt'

import { IUser } from '../types/models'

export async function preSaveHook(this, next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.set('password', await bcrypt.hash(this.password, salt))
    return next()
  } catch (err) {
    return next(err)
  }
}
export async function preUpdateHook(this, next) {
  const update = this.getUpdate()
  if (!update?.$set?.password) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.set('password', await bcrypt.hash(update?.$set?.password, salt))
    return next()
  } catch (err) {
    return next(err)
  }
}
export async function verifyPassword(Ipassword, password) {
    return bcrypt.compare(Ipassword, password)
}
