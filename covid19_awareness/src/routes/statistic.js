const express = require('express')
const graphRoute = express.Router()
const axios = require('axios')
const cheerio = require("cheerio")
var Feed = require('rss-to-json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
var fs = require('fs');

var globalVariable={
       statistic: []};
var today = new Date();
let currentDate = ("0" +(today.getDate()-'1')).slice(-2);
let currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
let currentYear = today.getFullYear();


// get all quiz questions
graphRoute.get('', async (req, res) => {
    try {


        today = currentDate + '-' + currentMonth + '-' + currentYear
        if (currentMonth == '1') {
            lastMonth = '12'
        }
        else 
        {
            lastMonth = currentMonth - '1'
        }
        lastDay = currentDate + '-' + lastMonth + '-' + currentYear
        

        console.log(lastDay)
        newAPI = await axios.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=SK&after=` + lastDay + '&before=' + today )  
        res.render('statistic', {statistic: JSON.stringify(newAPI.data.cases)})
    } catch (err) {
        if(err.response) {
            res.render('statistic', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('statistic', { article : null })
            console.log(err.requiest)
        } else {
            res.render('statistic', { article : null })
            console.error('Error', err.message)
        }
    } 

})




module.exports = graphRoute 