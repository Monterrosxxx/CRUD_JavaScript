import mongoose from "mongoose";

//1- Configurar la URL de la base de datos
const URL = "mongodb://localhost:27017/ferreteriaEPA"

//2- Conecto la base de datos
mongoose.connect(URL);

//------------Comprobar que todo funcione--------------------

const connection = mongoose.connection;

//veo si funciona
connection.once("open", () => {
    console.log("DB is connected")
})

//veo si se desconecta
connection.on("disconnected", () => {
    console.log("DB is disconnected")
})

//veo si hay un error
connection.on("error", () => {
    console.log("Error en la conexión")
})