require('dotenv').config()
const helmet = require('helmet')
const express = require('express')

const app = express()
const pool  = require('./database')

const cors = require('cors')
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

//get intro
app.get('/', async (req, res) => {
    try {
        const intro = await pool.query('SELECT * FROM intro')
        res.json(intro.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update intro
app.put('/', async (req, res) => {
    try {
        const { blurb } = req.body
        const updateBlurb = await pool.query(
            "UPDATE intro SET blurb = $1 WHERE id = 1",
            [blurb]
        )

    }
    catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})