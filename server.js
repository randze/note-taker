const express = require('express')
const fs = require('fs')
const path = require('path');

// express defaults
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// serve public folder
app.use(express.static('public'))


// app listener
app.listen( PORT, function(){
    console.log( `App listening on PORT: ${PORT}`)
})