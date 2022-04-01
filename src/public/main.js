



const titulo = document.querySelector("#title");

const notForm = document.querySelector("#form")



notForm.addEventListener("submit", (e) => {
    e.preventDefault();

    noteID ? editNote(noteID, titulo.value) : saveNotes(titulo.value);

    titulo.value = "";
    
    
})