import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as AuthModel from '../models/auth.model'
import { ApiError } from '../middleware/errorHandler'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

export const login = async (email: string, password: string) => {
  const user = await AuthModel.findUserByEmail(email)
  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  )

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  }
}

export const register = async (name: string, email: string, password: string, role?: string) => {
  const existingUser = await AuthModel.findUserByEmail(email)
  if (existingUser) {
    throw new ApiError(409, 'Email already registered')
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = await AuthModel.createUser(name, email, hashedPassword, role)

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  )

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  }
}
