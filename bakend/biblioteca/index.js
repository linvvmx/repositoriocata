//falta nmp init -y
//-------------------------------------------------------------------------------------------------
//inicando fs para leer y escribir documentos de tipo JSON.
const fs = require("fs");
const express = require('express');
const { constants } = require("buffer");
const app = express()

app.listen(3000, console.log("Server encendido!"))
//req: agarrar requeriminetos. res: respuesta hacia usuario.
app.use(express.json())
app.get("/libros", (req, res) => {
     //convertir texto en arreglo (parse) read: para leer documento.
    const libros = JSON.parse(fs.readFileSync('libros.json', "utf8"))
    //libro es arreglo por lo tanto uso json
    res.json(libros)
});

//para post lo que hay que agregar viene del cuerpo de la pagina "body".
app.post("/libros", (req, res) => {
    //lo que venga del cuerpo de la pagina se agregara a esta variable, tiene que estar en la misma estructura como arreglo.
    const libroNuevo = req.body
    const libros = JSON.parse(fs.readFileSync('libros.json', "utf8"))
    //para agregar un elemento o un arreglo al final del arreglo.
    libros.push (libroNuevo)
    //transformamos la variable libro a elemento (stringify es lo contrario q parse).
    fs.writeFileSync ("libros.json", JSON.stringify(libros))
    res.send("Libro agregado")
});
//se agrega un libro con metodo post.

//para borrar un libro.
app.delete("/libros/:id", (req, res) => {
    //ya que es id accedemos a los parametros.
    const { id } = req.params
    const libros = JSON.parse(fs.readFileSync('libros.json', "utf8"))
    //identificar indice del libro (se puede crear con cualquier nombre) 
    const indice = libros.findIndex (l => l.id == id) //buscando id del libro que coincida con la variable id que declaro arriba.
    //para eliminarlo acceder a este metodo, el que coincida con el indice.
    libros.splice(indice, 1)
    //la variable se modifica y se reescribe.
    fs.writeFileSync ("libros.json", JSON.stringify(libros))
    res.send("Libro eliminado")
});