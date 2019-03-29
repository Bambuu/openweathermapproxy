const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const memoize = require('memoizee');

const app = express();
const port = 3000;

app.get('/', async (req, res, next) => {
    try{
        const city = req.query.city;
        if (!city){
            next(new Error("Must supply city as a parameter"))
        }

        const response = await getWeatherData(city);
        return res.send({
            ...response
        });
    } catch (e){
        next(e);
    }
});


const getWeatherData = memoize(async (city) => {
    const apiKey = "89e930a8066c712e54f311a0c03fe339";

    console.log("Fetching data!");
    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params:{
            apiKey: apiKey,
            q: city,
            units: 'metric'
        }});
        return response.data;
    } catch (e){
        console.log(e);
        throw e;
    }
}, {maxAge: 10000});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));