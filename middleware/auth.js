const jwt = require('jsonwebtoken')
const {jwtConfig} = require('../config')

const authenticateToken = ((req, res, next) => {
  const token = req.headers['x-access-token']
  if (token == null) return res.status(401).json({status: 401, message: 'No token provided'})
  jwt.verify(token, jwtConfig.accessTokenSecret, (err, email) => {
    console.log(err)
    if (err) return res.status(403).json({status: 403, message: 'Invalid token'})
    req.user = email
    next()
  })
})

module.exports = authenticateToken
