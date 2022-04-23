const express = require('express');
const fs = require('fs');
const path = require("path");
const {notes} = require('./data/db.json');

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(
        path.join(__dirname, './public/index.html')
    )
});

app.get('/api/notes', (req, res) => {
    res.send(notes);
});

app.post('/api/notes/', (req, res) => {
    
    if (!req.body.id) {
        req.body.id = notes.length.toString();    
        const note = createNewNote(req.body, notes);
    }
    else {
        // update note on backend here
    }
    res.send(note);
});

app.listen(PORT, () =>{
    console.log(`SERVER STARTED ON ${PORT}`);
})


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({notes:notesArray})
    )
    return notesArray;
}