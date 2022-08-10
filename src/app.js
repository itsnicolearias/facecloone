const express = require('express')
const { envConfig } = require('./config/envConfig')

const app = express()

app.use(express.json)

const PORT = envConfig.app.port

app.listen(PORT, () => {
    console.log('Server running')
})