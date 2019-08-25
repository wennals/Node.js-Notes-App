const fs = require('fs')
const chalk  = require('chalk')
const getNotes = () => {
    return 'Your notes...'
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title )

    if(!duplicateNote){
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

const removeNote = (title) =>{
    const notes = loadNotes()
    
    const notesToKeep = notes.filter((note) => note.title !== title
)

    saveNotes(notesToKeep)
    if(notesToKeep.length  < notes.length){
        console.log(chalk.green.inverse(title + ' was deleted'))
    }else{
        console.log(chalk.red.inverse('No titles match ' + title + '!'))
    }
    
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead){
        console.log(chalk.inverse(title))
        console.log(noteToRead.body)
    }else{
        console.log(chalk.red.inverse('Unable to find note with title ' + title + '!'))
    }
}

const listNotes =  () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes: '))
    notes.forEach((note) => console.log('Title: '  + note.title))
    

    if(notes.length === 0){
        console.log(chalk.inverse.red('You don\'t have any notes'))
    }
}



const loadNotes = () => {
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    }catch(e){
        return []
    }
    
}

const saveNotes = (notes) => {
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