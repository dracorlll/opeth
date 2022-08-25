const axios = require('axios')
const {serverConfig} = require('../config')

// controller for user registration
const register = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.clientService}/register`, {email, password})
    res.status(201).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for user login
const login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.clientService}/login`, {email, password})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for token refresh
const token = async (req, res, next) => {
  const {refreshToken} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.clientService}/token`, {refreshToken})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}

module.exports = {register, login, token}
