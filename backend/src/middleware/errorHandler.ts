import { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal Server Error'

  console.error(`[ERROR] ${err.message}`, {
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export class ApiError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
