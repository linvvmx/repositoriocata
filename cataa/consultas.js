const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'cft.2026',
    database: 'plan_de_viajes',
    allowExitOnIdle: true
})
const agregarViaje = async (destino, presupuesto) => {
    const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2)"
    const values = [destino, presupuesto]
    const result = await pool.query(consulta, values)
    //console.log("Viaje agregado")
}
const obtenerViajes = async () => {
    const { rows } = await pool.query("SELECT * FROM viajes")
    console.log(rows)
    return rows
}
obtenerViajes()

const modificarPresupuesto = async (presupuesto, id) => {
    const consulta = "UPDATE viajes SET presupuesto = $1 WHERE id = $2"
    const values = [presupuesto, id]
    const result = await pool.query(consulta, values)
}

const eliminarViaje = async (id) => {
    const consulta = "DELETE FROM viajes WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
}

//exportar todas las funciones
module.exports = { agregarViaje, obtenerViajes, modificarPresupuesto, eliminarViaje }