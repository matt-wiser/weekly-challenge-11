const notesArray = [];
const addNoteEl = document.getElementById('add-note');
const saveNoteEl = document.getElementById("save-note");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

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
            populateNotes(notesArray);
        })
}

function populateNotes(notes) {
    const noteContainerEl = document.getElementById("notes-container");
    removeAllChildNodes(noteContainerEl);

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
    const noteTitleEl = document.getElementById("note-title-edit");
    const noteBodyEl = document.getElementById("note-body");
    
    noteTitleEl.value = "";
    noteBodyEl.value = "";
    saveNoteAppear();
    inputAppear();
}

function saveNote() {
    const noteTitleEl = document.getElementById("note-title-edit");
    const noteBodyEl = document.getElementById("note-body");
    const note = {
        title:  noteTitleEl.value,
        body: noteBodyEl.value
    }
    // check if note title has data-attribute-id, if so send request to update; conditionally add the id as well.
    
    fetch('/api/notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(note)
      })
      .then(response =>{
          if (response.ok) {
              return response.json();
          }
          alert("Error: " + response.statusText);
      })
      .then(postResponse => {
          populateNotes(postResponse);
          notesArray.push(postResponse[postResponse.length - 1]);
      })
}

function updateNote() {

}

function saveNoteAppear() {
    saveNoteEl.classList.remove("d-none");
}

function saveNoteDisappear(){
    saveNoteEl.setAttribute("class", "d-none");
}

function inputAppear () {
    const noteTitleEl = document.getElementById("note-title-edit");
    const noteBodyEl = document.getElementById("note-body");

    noteTitleEl.classList.remove("d-none");
    noteBodyEl.classList.remove("d-none");
}

function deleteNote() {
    saveNoteDisappear();
    inputDisappear();
}

function inputDisappear () {
    const noteTitleEl = document.getElementById("note-title-edit");
    const noteBodyEl = document.getElementById("note-body");

    noteTitleEl.setAttribute("class", "d-none");
    noteBodyEl.setAttribute("class", "d-none");
}

document.body.addEventListener('click', event => {
    const eventClass = event.target.className;

    if (eventClass !== "note-info" && eventClass !== "note-title" && eventClass !== "delete-button") {
      return
    }
    if (eventClass === "note-info") {
        populateMainNote(notesArray[event.target.id]);
        saveNoteAppear();
        inputAppear();
    }

    if (eventClass === "note-title") {
        populateMainNote(notesArray[event.target.parentElement.id]);
        saveNoteAppear();
        inputAppear();
    }

    if (eventClass === "delete-button") {
        console.log("delete-button clicked!");
        deleteNote();
    }    
  }  
)

addNoteEl.addEventListener('click', createNewNote);
saveNoteEl.addEventListener('click', saveNote);
getNotes();