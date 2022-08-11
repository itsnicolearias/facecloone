const Sequelize = require('sequelize')
const { envConfig } = require('./envConfig')

 const sequelize = new Sequelize(
    'facecloone',
    envConfig.db.user,
    envConfig.db.password,{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = { sequelize }