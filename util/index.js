const redis = require('redis')
const {serverConfig} = require('../config')

class Redis {
  constructor() {
    this.url = serverConfig.redisURL
    this.connected = false
    this.client = null
  }

  getConnection() {
    if (this.connected) return this.client

    this.client = redis.createClient({
      url: this.url
    })
    this.client.connect()
    this.connected = true
    return this.client
  }
}

module.exports = new Redis()
