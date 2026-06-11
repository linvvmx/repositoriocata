const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

// Conexión PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "fbi",
    password: "cata1234",
    port: 5432
})
pool.connect()

    .then(() => {

        console.log("✅ Conectado a la base de datos FBI")

    })

    .catch((error) => {

        console.log("❌ Error al conectar con PostgreSQL")

        console.log(error.message)

    })

app.post("/agentes", async(req,res)=>{

    try{

        const { email, password } = req.body

        const hash = bcrypt.hashSync(password,10)

        await pool.query(

            "INSERT INTO agentes(email,password) VALUES($1,$2)",

            [email, hash]

        )

        res.send("Agente registrado")

    }
    catch(error){

        res.status(500).send(error.message)

    }

})
app.post("/login", async(req,res)=>{

    try{

        const { email, password } = req.body

        const resultado = await pool.query(

            "SELECT * FROM agentes WHERE email=$1",

            [email]

        )

        if(resultado.rows.length===0){

            return res.status(404).send(

                "Agente no encontrado"

            )

        }

        const agente = resultado.rows[0]

        const valido = bcrypt.compareSync(

            password,

            agente.password

        )

        if(!valido){

            return res.status(401).send(

                "Credenciales inválidas"

            )

        }

        const token = jwt.sign(

            { email: agente.email },

            "secreto",

            { expiresIn:"15m" }

        )

        res.json({

            mensaje:"Acceso concedido",

            token

        })

    }
    catch(error){

        res.status(500).send(error.message)

    }

})
const verificarToken = (req, res, next) => {

    try {

        const token = req.header("Authorization")

        if (!token) {
            return res.status(401).send("Debe enviar un token")
        }

        const tokenLimpio = token.split(" ")[1]

        jwt.verify(
            tokenLimpio,
            "secreto"
        )

        next()

    } catch (error) {

        res.status(401).send("La sesión ha expirado")

    }

}
app.get("/casos", async(req,res)=>{

    const resultado = await pool.query(

        "SELECT * FROM casos"

    )

    res.json(resultado.rows)

})
app.post(

    "/casos",

    verificarToken,

    async(req,res)=>{

        const {

            sospechoso,

            delito,

            nivel_peligrosidad

        } = req.body

        await pool.query(

            "INSERT INTO casos(sospechoso,delito,nivel_peligrosidad) VALUES($1,$2,$3)",

            [

                sospechoso,

                delito,

                nivel_peligrosidad

            ]

        )

        res.send(

            "Caso registrado"

        )

})
app.put(

    "/casos/:id",

    verificarToken,

    async(req,res)=>{

        const { id } = req.params

        const {

            nivel_peligrosidad

        } = req.body

        await pool.query(

            "UPDATE casos SET nivel_peligrosidad=$1 WHERE id=$2",

            [

                nivel_peligrosidad,

                id

            ]

        )

        res.send(

            "Caso actualizado"

        )

})
app.delete(

    "/casos/:id",

    verificarToken,

    async(req,res)=>{

        try{

            const { id } = req.params

            const resultado = await pool.query(

                "DELETE FROM casos WHERE id=$1",

                [id]

            )

            if(resultado.rowCount===0){

                throw new Error(

                    "Caso no encontrado"

                )

            }

            res.send(

                "Caso cerrado"

            )

        }
        catch(error){

            res.status(404).send(

                error.message

            )

        }

})
app.listen(3000, () => {

    console.log("Servidor del FBI funcionando en el puerto 3000")

})