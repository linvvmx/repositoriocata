const fs = require("fs");
const archivo = "citas.json";

//creo funcion para leer citas:
const leer = () => {
    /*fs:modulo de archivo. readfilesync:lee archivo de forma inmediata.
    "archivo": nos referimos a "citas.json.
    utf8: para leerlo como texto.*/
    const data = fs.readFileSync(archivo, "utf8");
    /*JSON.parse(data):Convierte el texto a objeto de JavaScript(en algo que JavaScript pueda usar)*/
    const citas = JSON.parse(data);
    /*console: Imprime todas las citas en consola*/
    console.log(citas);
};

//para registrar cita:
const registrar = (nombre,edad,animal,color,enfermedad) => {
    const data = fs.readFileSync(archivo, "utf8");
    const citas = JSON.parse(data);

    const nuevaCita= {
        nombre,
        edad,
        animal,
        color,
        enfermedad
    };

    citas.push(nuevaCita);

    //write: escribe un archivo que es (archivo). JSON: guarda texto no objetos.
    //null: no filtramos nada. 2: espacios de indentacion.

    fs.writeFileSync(archivo, JSON.stringify(citas,null,3));
}

module.exports = {registrar, leer};

/*para agregar un registro de cita: 
node index.js registrar Benito "2 años" perro blanco vomitos

para ver todas las citas:
node index.js leer*/