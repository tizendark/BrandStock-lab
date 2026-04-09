import Joi from 'joi'

// Auth schemas
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
})

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('admin', 'employee').default('employee')
})

// Product schemas
export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  sku: Joi.string().max(50).required(),
  description: Joi.string().max(500).allow('', null),
  category: Joi.string().max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().integer().min(0).default(0),
  minStock: Joi.number().integer().min(0).default(5)
})

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(200),
  sku: Joi.string().max(50),
  description: Joi.string().max(500).allow('', null),
  category: Joi.string().max(100),
  price: Joi.number().positive().precision(2),
  minStock: Joi.number().integer().min(0)
}).min(1)

export const updateStatusSchema = Joi.object({
  isActive: Joi.boolean().required()
})

// Movement schemas
export const createMovementSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  type: Joi.string().valid('entrada', 'salida').required(),
  quantity: Joi.number().integer().positive().required(),
  reason: Joi.string().max(200).required(),
  notes: Joi.string().max(500).allow('', null)
})
