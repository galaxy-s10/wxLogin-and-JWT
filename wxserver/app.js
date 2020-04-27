var express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var user_router = require('./router/user_router')


app.use('/user', user_router)

app.listen('3000', function () {
  console.log('running......')
})