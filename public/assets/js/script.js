const notesArray = [];
const addNoteEl = document.querySelector('#add-note');

function getNotes () {
    fetch('/api/notes')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else{
                console.log("ERROR WHEN REQUESTING NOTES");
            }
        })
        .then(notes =>{
            notes.forEach(note => {
                notesArray.push(note);
            });
            populateNotes(notes);
        })
}

function populateNotes(notes) {
    const noteContainerEl = document.getElementById("notes-container");

    notes.forEach(note => {
    
        const noteEl = document.createElement("div");
        const titleEl = document.createElement("h4");
        const deleteButtonLinkEl = document.createElement("a");
        const deleteButtonImgEl = document.createElement("img");
        
        noteEl.setAttribute("id", `${note.id}`);
        noteEl.setAttribute("class", "note-info");
        
        titleEl.textContent = note.title;
        titleEl.setAttribute("class", "note-title");
        noteEl.append(titleEl);

        deleteButtonImgEl.setAttribute("src", "./assets/img/trash.svg");
        deleteButtonImgEl.setAttribute("class", "delete-button");

        deleteButtonLinkEl.setAttribute("href", "#");
        deleteButtonLinkEl.append(deleteButtonImgEl);

        noteEl.append(deleteButtonLinkEl);

        noteContainerEl.append(noteEl);
    });
}

function populateMainNote(note) {
        
    const noteTitleEl = document.getElementById("note-title-edit");
    const noteBodyEl = document.getElementById("note-body");
    
    noteTitleEl.value = note.title;
    noteTitleEl.dataset.id = note.id;

    noteBodyEl.value = note.body;    
}

function createNewNote() {
    console.log("new note creation request, write POST fetch here");
}



document.body.addEventListener('click', event => {
    const eventClass = event.target.className;
    if (eventClass !== "note-info" && eventClass !== "note-title" && eventClass !== "delete-button" && event.target.id !== "save-note") {
      return
    }
    if (eventClass === "note-info") {
        populateMainNote(notesArray[event.target.id]);
    }

    if (eventClass === "note-title") {
        console.log("note-title clicked!");
    }

    if (eventClass === "delete-button") {
        console.log("delete-button clicked!");
    }
    
    if (event.target.id === "save-note") {
        console.log("save-button clicked!");
    }
  }  
)
addNoteEl.addEventListener('click', createNewNote);
getNotes();