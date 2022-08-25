const bcrypt = require('bcryptjs')
const db = require('../model')

const Users = db.users

// validating the password
const passwordValidator = (value) => {
  const errors = []
  if (value.match(/^(?=.*[a-z])/) === null) {
    errors.push('Password must contain at least 1 lowercase alphabetical character')
  }
  if (value.match(/^(?=.*[A-Z])/) === null) {
    errors.push('Password must contain at least 1 uppercase alphabetical character')
  }
  if (value.match(/^(?=.*[0-9])/) === null) {
    errors.push('Password must contain at least 1 numeric character')
  }
  if (value.match(/^(?=.*[!@#$%^&*])/) === null) {
    errors.push('Password must contain at least one special character')
  }
  if (value.match(/^(?=.{8,})/) === null) {
    errors.push('Password must be eight characters or longer')
  }
  return errors
}

// creating a new user and checking if the email is already in use
// if not, then hash the password and create a new user.
const register = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await Users.findOne({where: {email}})
    if (user) {
      return next({status: 400, message: 'Email already in use'})
    }
    const errors = passwordValidator(password)
    if (errors.length > 0) {
      return next({status: 400, message: errors})
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await Users.create({email, password: hash})
    res.status(201).json('User created')
  } catch (err) {
    console.log(err)
    next({status: 500, message: err})
  }
}
const login = (req, res) => {
  // TODO implement login
}
module.exports = {register, login}
