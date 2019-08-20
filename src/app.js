//this library is from node so I don't have to install it
//I t helps me to get the path of the files and accsees them.
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//__dirname with this I obtain tha route at proyect level
//with join I can add something to the route in order to run a specific file in a folder

//Define pathS for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')
//SetUp static directory to serve 
app.use(express.static(publicDirectoryPath))
//Setup handlebars engine and views locations 
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Roy Rodriguez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'About page ',
        descripton: 'Description ',
        title: 'About page',
        name: 'Roy Rodriguez'
    })
})
app.get('/help', (req, resp) => {
    resp.render('help', {
        helptext: 'It is working',
        title: 'Help page',
        name: 'Roy Rodriguez'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        else {
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error })
                }
                else {
                    res.send({
                        forecast: forecastdata,
                        location,
                        address: req.query.address
                    })
                }
            })
        }


    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Help article not found',
        name: 'Roy Rodriguez Loaiza'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Page not found',
        name: 'Roy Rodriguez Loaiza'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
