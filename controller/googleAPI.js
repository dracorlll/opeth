const axios = require('axios')
// const redisClient = require('../util').getConnection()

const URL = 'https://www.googleapis.com/books/v1/volumes?printType=books'

// controller for books search
const search = async (req, res, next) => {
  const {
    keyword, title, author, startIndex, maxResults
  } = req.query
  let searchString = '&q='

  if (keyword) {
    searchString += keyword
  }
  if (title) {
    searchString += `+intitle:${title}`
  }
  if (author) {
    searchString += `+inauthor:${author}`
  }
  if (startIndex) {
    searchString += `&startIndex=${startIndex}`
  }
  if (maxResults) {
    searchString += `&maxResults=${maxResults}`
  }
  try {
    const cacheResults = await redisClient.get(URL + searchString)
    if (cacheResults) res.json(JSON.parse(cacheResults))
    else {
      const apiResponse = await axios.get(URL + searchString)
      await redisClient.set(URL + searchString, JSON.stringify(apiResponse.data), {
        EX: 1800, // 30 minutes
        NX: true
      })
      res.json(apiResponse.data)
    }
  } catch (error) {
    console.log(error)
    if (error?.response?.data?.error) {
      next({
        status: error.response.data.error.code,
        message: error.response.data.error.message
      })
    } else next({status: 500, message: error})
  }
}

module.exports = {search}
