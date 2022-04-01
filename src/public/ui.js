const $notes = document.querySelector("#notes");

let noteID = ""



const notesUI = (nota) => {
    const div = document.createElement("div");


    
    div.innerHTML += `
    <div style="border-radius: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" class="card card-body  mb-2 mt-4 animate__animated animate__fadeInUp">
        <div class="d-flex justify-content-between">
            
            <h3 class="card-title"> •   ${nota.titulo}</h3>
            <div>
                <button class="btn btn-danger delete" data-id=${nota.id}>Eliminar</button>
                <button class="btn btn-warning edit" data-id=${nota.id}>Editar</button>
            </div>
        </div>
        

    </div>        
    `

    const btnDelete = div.querySelector(".delete");
    const btnEdit = div.querySelector(".edit");
    btnDelete.addEventListener("click", () => {
        deleteNote(btnDelete.dataset.id);
    })
    btnEdit.addEventListener("click", () => {
        
        getNote(btnEdit.dataset.id);
    })

    return div;

}


const renderizarNotes = (notes) => {
    $notes.innerHTML = "";
    notes.forEach(nota => {
        $notes.append(notesUI(nota));
    })
}


const appendNote = (nota) => {
    $notes.append(notesUI(nota));
}