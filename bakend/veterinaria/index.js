//Trae (importa) lo que hay dentro del archivo operaciones.js
const {registrar, leer} = require ("./operaciones");

//argumentos desde la terminal, slice: (desde la posición 2 en adelante)
const [operacion, nombre, edad, animal, color, enfermedad] = process.argv.slice(2);

if (operacion === "registrar"){
    registrar(nombre, edad, animal, color, enfermedad);
}

if(operacion === "leer"){
    leer();
}