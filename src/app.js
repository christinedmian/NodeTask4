
const express = require("express")

const app = express()

const port = process.env.PORT || 3000

const path = require("path")

const x = path.join(__dirname, "../public")

app.use(express.static(x))


app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, "../temp1/views")
app.set("views", viewsDirectory)


var hbs = require('hbs')
const partialsPath = path.join(__dirname, '../temp1/partials')
hbs.registerPartials(partialsPath)

const geocode = require('./data1/geocode')
const forecast = require('./data1/forecast')
app.get('/', (req, res) => {
    res.render('index', {
        tittle:"Our Weather Website",
        desc: "Welcome to out website. to know your country's weather ,longtitude and latitude,please enter the name of your country ",
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must enter an address"
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location: req.query.address,
                latitude: data.latitude,
                longtitude: data.longtitude
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send('404 page not found')
})

app.listen(port, () => {
    console.log("app is listening on port 3000")
})
