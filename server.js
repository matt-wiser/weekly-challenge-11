const express = require('express');
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

app.listen(PORT, () =>{
    console.log(`SERVER STARTED ON ${PORT}`);
})