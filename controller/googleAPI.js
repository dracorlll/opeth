const axios = require('axios')

const maxResults = 5
const URL = `https://www.googleapis.com/books/v1/volumes?printType=books&${maxResults}`

// controller for books search
const search = async (req, res, next) => {
  const {
    keyword, title, author, startIndex
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
  try {
    const apiResponse = await axios.get(URL + searchString)
    res.json(apiResponse.data)
  } catch (error) {
    next({status: error.response.data.error.code, message: error.response.data.error.message})
  }
}

module.exports = {search}
