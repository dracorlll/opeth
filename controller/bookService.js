const axios = require('axios')
const {serverConfig} = require('../config')

// controller for adding book to user's list
const add = async (req, res, next) => {
  const {title, id} = req.body
  if (!title || !id) return next({status: 400, message: 'Title and id are required'})
  const {email} = req.user
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/add`, {email, title, id})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for user's book list
const list = async (req, res, next) => {
  let {maxResults, startIndex} = req.query
  const {email} = req.user
  if (!maxResults) maxResults = 10
  if (!startIndex) startIndex = 0
  if (maxResults > 40) return next({status: 400, message: 'Max results cannot be more than 40'})
  console.log(startIndex, maxResults)
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/list`, {email, startIndex, maxResults})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}
// controller for removing book from user's list
const remove = async (req, res, next) => {
  const {id} = req.params
  const {email} = req.user
  try {
    const apiResponse = await axios.post(`${serverConfig.bookService}/remove`, {email, id})
    res.status(200).json(apiResponse.data)
  } catch (err) {
    if (err.response?.data?.error) next(err.response.data.error)
    else next({status: 500, message: err.message})
  }
}

module.exports = {add, list, remove}
