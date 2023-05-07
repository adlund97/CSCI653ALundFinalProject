const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/states', require('./routes/stateRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json('error: 404 Not Found')
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.listen(port, () => console.log(`Server started on port ${port}`))