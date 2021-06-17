const express = require('express')
const graphRoute = express.Router()
const axios = require('axios')
const cheerio = require("cheerio")
var Feed = require('rss-to-json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
var fs = require('fs');
var today = new Date();
let currentDate = ("0" +(today.getDate()-'1')).slice(-2);
let currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
let currentYear = today.getFullYear();
var location = "SK"

graphRoute.post('/', async (req, res) => {
    location = req.body.location;
    console.log(location)
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
        newAPI = await axios.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=`+ location + "&after=" + lastDay + '&before=' + today )  
        stat = await axios.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=`+ location + "&after=" + lastDay + '&before=' + today )
        recovered =  await axios.get(`https://api.opencovid.ca/timeseries?stat=recovered&loc=`+ location + "&after=" + lastDay + '&before=' + today )
        console.log("https://api.opencovid.ca/timeseries?stat=mortality&loc="+ location + "&after=" + lastDay + '&before=' + today)
        switch(location)
        {
            case("AB"):
            {
                state = "Alberta";
                break;
            }
            case("BC"):
            {
                state = "British Columbia";
                break;
            }
            case("MB"):
            {
                state = "Manitoba";
                break;
            }
            case("NB"):
            {
                state = "New Brunswick";
                break;
            }
            case("ON"):
            {
                state = "Ontario";
                break;
            }
            case("QC"):
            {
                state = "Quebec";
                break;
            }
            case("SK"):
            {
                state = "Saskatchewan";
                break;
            }
            case("YT"):
            {
                state = "Yukon"
                break;
            }
            default:
                break;

        }
        res.render('statistic', {statistic: JSON.stringify(newAPI.data.cases), death_cases: JSON.stringify(stat.data.mortality), recovered_cases: JSON.stringify(recovered.data.recovered), state: state})
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
});
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
        console.log("https://api.opencovid.ca/timeseries?stat=mortality&loc="+ location + "&after=" + lastDay + '&before=' + today)
        newAPI = await axios.get(`https://api.opencovid.ca/timeseries?stat=cases&loc=`+ location + "&after=" + lastDay + '&before=' + today ) 
        stat = await axios.get(`https://api.opencovid.ca/timeseries?stat=mortality&loc=`+ location + "&after=" + lastDay + '&before=' + today )
        recovered =  await axios.get(`https://api.opencovid.ca/timeseries?stat=recovered&loc=`+ location + "&after=" + lastDay + '&before=' + today )
        console.log("https://api.opencovid.ca/timeseries?stat=mortality&loc="+ location + "&after=" + lastDay + '&before=' + today)
        switch(location)
        {
            case("AB"):
            {
                state = "Alberta";
                break;
            }
            case("BC"):
            {
                state = "British Columbia";
                break;
            }
            case("MB"):
            {
                state = "Manitoba";
                break;
            }
            case("NB"):
            {
                state = "New Brunswick";
                break;
            }
            case("ON"):
            {
                state = "Ontario";
                break;
            }
            case("QC"):
            {
                state = "Quebec";
                break;
            }
            case("SK"):
            {
                state = "Saskatchewan";
                break;
            }
            case("YT"):
            {
                state = "Yukon"
                break;
            }
            default:
                break;

        }
        res.render('statistic', {statistic: JSON.stringify(newAPI.data.cases), death_cases: JSON.stringify(stat.data.mortality), recovered_cases: JSON.stringify(recovered.data.recovered), state: state})
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