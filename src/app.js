const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forcast = require('./utils/forcast.js');

const app = express();
const port = process.env.PORT || 3000;

// join the file path
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// set up static directory to serve
app.use(express.static('public'));

// get index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by Sahil Ardeshna'
    });
});

// gget about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Sahil Ardeshna'
    });
});

// get help.hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Created by Sahil Ardeshna'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Help article not found'
    });
});

// weather 
app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                location,
                forcast: forcastData
            });
        });        
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        product: []
    });
});

// Error 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'page not found'
    });
});

// listen on port on browser
app.listen(port, () => {
    console.log('server is running on port ' + port);
});