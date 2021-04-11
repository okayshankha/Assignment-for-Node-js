require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

const restRoutes = require("./restRoutes")


const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan('combined'))
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ limit: '50mb', extended: true }))


app.use(`/api`, restRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const apiError = createError(404);
    return res.status(apiError.statusCode).send(apiError)
})

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    const apiError = createError(500);
    return res.status(apiError.statusCode).send(apiError)
})

module.exports = app
