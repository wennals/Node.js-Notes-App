const fs = require('fs')
const chalk  = require('chalk')
const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body){
    const notes = loadNotes()
    
    const titleCheck = notes.filter(function (note){
        return note.title === title
    })

    if(titleCheck.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('A note with this title already exists'))
    }    
}

const removeNote = function (title){
    const notes = loadNotes()
    
    const notesToKeep = notes.filter(
        function (note){
            return  note.title !== title
        }
    )
    saveNotes(notesToKeep)
    if(notesToKeep.length  < notes.length){
        console.log(chalk.green.inverse(title + ' was deleted'))
    }else{
        console.log(chalk.red.inverse('No titles match ' + title + '!'))
    }
    
}

const readNote = function (title){
    const notes = loadNotes()
    const noteToRead = notes.filter(
        function (note){
            return note.title === title
        }
    )

    if(noteToRead !== 0){
        console.log(chalk.green.inverse(noteToRead.body))
    }else{
        console.log(chalk.red.inverse('No titles match ' + title + '!'))
    }
}

const listNotes = function (){
    const notes = loadNotes()
    console.log(notes)
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
    fs.writeFileSync('notes.json', notesJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}