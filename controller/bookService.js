const axios = require('axios')
const {serverConfig} = require('../config')

// controller for adding book to user's list
const add = async (req, res, next) => {
  const {email, title} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/add`, {email, title})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for user's book list
const list = async (req, res, next) => {
  const {email} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/list`, {email})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for removing book from user's list
const remove = async (req, res, next) => {
  const {email, title} = req.body
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/remove`, {email, title})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}

module.exports = {add, list, remove}
