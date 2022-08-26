const express = require('express')
const morgan = require('morgan')
const {errorHandler} = require('./middleware')
const {serverConfig} = require('./config')

const app = express()
app.use(express.json())

app.use('/api', require('./router'))

app.use(morgan('dev'))
app.all('*', (req, res, next) => {
  next({status: 404, message: 'Not Found'})
})
app.use(errorHandler)

app.listen(serverConfig.port, async () => {
  console.log(`Client service is running on port ${serverConfig.port}`)
})
