import Sequelize from 'sequelize'
import { envConfig } from './envConfig.js'

 const sequelize = new Sequelize(
    'facecloone',
    envConfig.db.user,
    envConfig.db.password,{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize