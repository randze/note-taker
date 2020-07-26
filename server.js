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

// load the Note list from file
let noteList = parseNotes()

// functions to read/write db.json note file
function parseNotes() {
    const noteList = JSON.parse( fs.readFileSync( './db/db.json', 'utf8') )
    return noteList
}
function saveNotes() {
    fs.writeFileSync( './db/db.json', JSON.stringify( noteList ) )
}

// page routers
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// API calls
// get all notes
app.get('/api/notes', function(req, res) {
    // console.log('get notes')
    res.send( noteList )
})

// add note
app.post('/api/notes', function(req, res) {
    let newNote = req.body
    // create new note id
    newNote.id = Date.now()
    noteList.push(newNote)
    saveNotes()

    res.send( newNote )
})

// delete note
app.delete( '/api/notes/:id', function( req, res ){
    const num = req.params.id

    noteList = noteList.filter( note=>note.id != num )
    saveNotes()

    res.send( { id: num, message: 'Note Removed', status: true } )
})

// app listener
app.listen( PORT, function(){
    console.log( `App listening on PORT: ${PORT}`)
})