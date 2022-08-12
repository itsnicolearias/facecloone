const express = require('express')
const createError = require('http-errors')
const { envConfig } = require('./config/envConfig')
const { sequelize } =require('./config/database')
const index = require('./routes/index')
require('dotenv').config()

//require('./models/user')
//require('./models/role')
//require('./models/post')
//require('./models/comment')
//require('./models/message')

const app = express()

app.use(express.json)

sequelize.sync({ alter: true })

app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
  })
  
  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  
    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

const PORT = envConfig.app.port

app.listen(PORT, () => {
    console.log('Server running')
})