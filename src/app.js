const express = require('express')
const { envConfig } = require('./config/envConfig')
const { sequelize } =require('./config/database')
require('./models/user')

const app = express()

app.use(express.json)

sequelize.sync({ alter: true })

const PORT = envConfig.app.port

app.listen(PORT, () => {
    console.log('Server running')
})