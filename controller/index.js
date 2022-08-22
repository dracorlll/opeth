const axios = require('axios')

const maxResults = 5
const URL = `https://www.googleapis.com/books/v1/volumes?printType=books&${maxResults}`

// getting data from Google Books API
const fetchApiData = async (searchURL) => {
  console.log('Request sent to the API')
  const apiResponse = await axios.get(searchURL)
  console.log(apiResponse.status)
  return apiResponse.data
}
// controller for books search
const search = async (req, res, next) => {
  const {
    keyword, title, author, startIndex
  } = req.query
  let results
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
    results = await fetchApiData(URL + searchString)
    res.json(results)
  } catch (error) {
    next({status: error.response.data.error.code, message: error.response.data.error.message})
  }
}

module.exports = {search}
