import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";


import {v4 as uuidv4} from "uuid";

const app = express();


let NOTES = []

//dentro del web socket se le pasa el servidor de express creado con http
const hhtpServer = http.createServer(app);
//se le pasa el servidor de http
const io = new WebSocketServer(hhtpServer);


//iniciamos el servidor io 
io.on("connection", (socket) => {
    socket.id = "Tomas"
    console.log("Nueva conexion:" + socket.id);

    socket.emit("server:GetNotes", NOTES);


    socket.on("client:NewNote", (newNote) => {
        const note = {...newNote, id: uuidv4()}
        NOTES.push(note);
        
        io.emit("server:NewNote", note);
    })
    //capturamos el evento de eliminar nota
    socket.on("client:DeleteNote", (id) => {
        NOTES = NOTES.filter(note => note.id !== id);
        //emitimos el evento de eliminar nota
        io.emit("server:GetNotes", NOTES);
    })
    
    //capturamos el evento de editar nota
    socket.on("client:getnote", (id) => {
        const note = NOTES.find(note => note.id === id);
        console.log(note);

        //emitimos la nota
        io.emit("server:getnote", note);
    })

    //capturamos el evento de editar nota
    socket.on("client:editnote", (noteActualizada) => {
        NOTES = NOTES.map(nota =>{
            if(nota.id === noteActualizada.id){
                nota.titulo = noteActualizada.titulo;
                
            }
            return nota;
        });
        //emitimos la nota
        io.emit("server:GetNotes", NOTES);
    })

})



app.use(express.static("./src/public"));


hhtpServer.listen(3000, () => {
    console.log("**************************");
    console.log("Server is running on port 3000");
    console.log("**************************");
})

