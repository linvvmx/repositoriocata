//importa funciones que vinene del documento consultas, agregar viaje y obtener viaje
const { agregarViaje, obtenerViajes, modificarPresupuesto, eliminarViaje } = require('./consultas')
const express = require('express');
const app = express();

//levantamos sv
app.listen(3000, console.log("SERVIDOR ENCENDIDO"))
app.use(express.json())

//llamamos funcion req res
app.get("/viajes", async (req, res) => {
    const viajes = await obtenerViajes()
    res.json(viajes)
})

app.post("/viajes", async (req, res) => {
    const { destino, presupuesto } = req.body
    await agregarViaje(destino, presupuesto)
    res.send("Viaje agregado con éxito")
})

app.put("/viajes/:id", async (req, res) => {
    const { id } = req.params
    const { presupuesto } = req.query
    await modificarPresupuesto(presupuesto, id)
    res.send("Presupuesto modificado con éxito")
})

app.delete("/viajes/:id", async (req, res) => {
    const { id } = req.params
    await eliminarViaje(id)
    res.send("Viaje eliminado con éxito")
})
