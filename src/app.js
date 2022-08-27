const express = require('express')
const indexRouter = require('./routes/index')
const morgan = require('morgan')
const { envConfig } = require('./config/envConfig')
const { sequelize } = require('./config/database')
const createError = require('http-errors')
const { ErrorObject } = require('./helpers/error')
const fileupload = require('express-fileupload')
const  {connectDB}  = require('./models')


const PORT = envConfig.app.port

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(fileupload())

app.use('/', indexRouter)

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

app.listen(PORT, () => {
    console.log('Server running')
})