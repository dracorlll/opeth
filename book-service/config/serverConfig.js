require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3002,
  allowedIP: process.env.ALLOWED_IP || 'localhost'
}
