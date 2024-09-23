const express = require('express')
const app = express()

const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = '2127b877044b42365c14225f6b322cde'
let city = 'Tartu'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => { 
        return response.json() 
    })
    .then(data => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp) - 273.15)
        console.log(description);
        console.log(temp);
        console.log(city);
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        })
    }) 
})

app.post('/', function(req, res) {
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => { 
        return response.json() 
    })
    .then(data => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp) - 273.15)
        console.log(description);
        console.log(temp);
        console.log(city);
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        })
    }) 
})

app.listen(3000)