const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./util/geocode.js');
const forecast = require('./util/forecast.js');

const app = express();

// define paths for express congif
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location (instead of using default views, we are using templates
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Russ Johnson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        img_name: '/images/IMG_0391.jpg',
        img_width: '600px',
        caption: 'Rusty and Amanda',
        name: 'Russell R. Johnson'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "Help! I have fallen and I can't get up",
        name: 'Russell R. Johnson'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'address was not provided'})
    }

    geocode(req.query.address, (geoError, {latitude, longitude, place_name} = {}) => {
        if (geoError) return res.send({error: geoError});
        forecast(latitude, longitude, (forecastError, data) => {
            if (forecastError) return res.send({error: forecastError});
            res.send({
                address:req.query.address,
                place_name:place_name,
                local_time: data.localtime,
                utc_offset: data.utc_offset,
                temperature: data.temperature,
                feelslike: data.feelslike,
                wind_speed: data.wind_speed,
                wind_dir: data.wind_dir,
                humidity: data.humidity
            });
        });
    });


});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Search time was not provided'
        });
    }
    console.log(req.query);
    res.send(
        {products: []});
});

// handles 404 must always be the last get
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        err_message: "Help Article Not Found",
        name: 'Russell R. Johnson'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        err_message: "Page not found",
        name: 'Russell R. Johnson'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})