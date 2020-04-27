const Sequelize = require('sequelize')
const config = require('./config')
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('已连接小程序数据库')
    })
    .catch(err => {
        console.error('连接小程序数据库失败:', err)
    })
module.exports = sequelize