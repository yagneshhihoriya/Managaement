const express = require('express')
const server = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = require('../app')
const logger = require('morgan')
const {errorHandling} = require('../utils/error')

server.use(logger('dev'))
server.use(express.json())

server.use('/',app)
server.use(errorHandling)

server.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})

