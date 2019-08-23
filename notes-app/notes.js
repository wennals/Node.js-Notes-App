const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body){
    const notes = loadNotes()

    notes.push({
        title: title,
        body: body
    })

    
    saveNotes(notes)
}

const loadNotes = function (){
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    }catch(e){
        return []
    }
    
}

const saveNotes = function (notes){
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.JSON', notesJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}