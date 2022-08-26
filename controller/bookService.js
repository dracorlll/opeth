const axios = require('axios')
const {serverConfig} = require('../config')

// controller for adding book to user's list
const add = async (req, res, next) => {
  const {title} = req.body
  const {email} = req.user
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
  const {startIndex} = req.body
  const {email} = req.user
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/list`, {email, startIndex})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for removing book from user's list
const remove = async (req, res, next) => {
  const {title} = req.body
  const {email} = req.user
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/remove`, {email, title})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}

module.exports = {add, list, remove}
