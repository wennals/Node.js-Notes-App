const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'The title of the note',
            demandOption: true, 
            type: 'string'
        },
        body:{
            describe:'The content of your note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv){
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function (){
        console.log('Removing the note!')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'View a list of all your notes',
    handler: function (){
        console.log('Showing a list of notes')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    handler: function (){
        console.log('Reading note')
    }
})

yargs.parse()
 // console.log(yargs.argv)
