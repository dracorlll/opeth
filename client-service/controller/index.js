const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../model')
const {jwtConfig} = require('../config')

const Users = db.users
const Tokens = db.tokens

const generateAccessToken = (email) => jwt.sign({email}, jwtConfig.accessTokenSecret, {expiresIn: '1h'})

// creating a new user and checking if the email is already in use
// if not, then hash the password and create a new user.
const register = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await Users.findOne({where: {email}})
    if (user) {
      return next({status: 400, message: 'Email already in use'})
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await Users.create({email, password: hash})
    res.status(201).json({message: 'User created'})
  } catch (err) {
    next({status: 500, message: err})
  }
}

// validating the password and comparing it to the hashed password in the database.
const login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await Users.findOne({where: {email}})
    if (!user) {
      return next({status: 400, message: 'User not found'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return next({status: 400, message: 'Incorrect password'})
    }
    const accessToken = generateAccessToken(email)
    const refreshToken = jwt.sign({email}, jwtConfig.refreshTokenSecret)
    await Tokens.upsert({email, token: refreshToken})
    res.status(200).json({accessToken, refreshToken})
  } catch (err) {
    next({status: 500, message: err})
  }
}

// validating the refresh token and comparing it to the hashed refresh token in the database.
const token = async (req, res, next) => {
  const {refreshToken} = req.body
  if (refreshToken == null) return next({status: 401, message: 'No token provided'})
  try {
    const result = await Tokens.findOne({where: {token: refreshToken}})
    if (!result) {
      return next({status: 403, message: 'Invalid token'})
    }
    jwt.verify(refreshToken, jwtConfig.refreshTokenSecret, (err, email) => {
      if (err) return next({status: 403, message: 'Invalid token'})
      const accessToken = generateAccessToken(email)
      res.json({accessToken})
    })
  } catch (err) {
    next({status: 500, message: err})
  }
}

module.exports = {register, login, token}
