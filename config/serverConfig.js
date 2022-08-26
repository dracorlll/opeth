require('dotenv').config()

module.exports = {
  clientService: process.env.CLIENT_SERVICE,
  bookService: process.env.BOOKS_SERVICE
}
