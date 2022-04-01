const socket = io()

const saveNotes = (titulo) => {
    socket.emit("client:NewNote", {
        titulo: titulo
        
    })
}

const deleteNote = (id) => {
    socket.emit("client:DeleteNote", id);
}

const getNote = (id) => {
    socket.emit("client:getnote", id);
}

const editNote = (id, titulo) => {
    socket.emit("client:editnote", {
        id,
        titulo,
        
    })

    

}


//cuando el servidor recibe una nota nueva
socket.on("server:NewNote", appendNote)

//cuando el servidor recibe una nota lista de notas
socket.on("server:GetNotes", renderizarNotes)

socket.on("server:getnote", (nota) => {
    const title = document.querySelector("#title");
    

    title.value = nota.titulo;
    

    noteID = nota.id;
    
})





