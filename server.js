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

// page routers
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// app listener
app.listen( PORT, function(){
    console.log( `App listening on PORT: ${PORT}`)
})