const Sequelize = require('sequelize')
const { envConfig } = require('./envConfig')
    
const sequelize = new Sequelize(
    envConfig.db.name,
    envConfig.db.user,
    envConfig.db.password, {
        host: 'localhost',
        dialect: 'mysql' 
      });

module.exports = { sequelize }