const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
const cheerio = require("cheerio")
var Feed = require('rss-to-json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );



newsRouter.get('', async(req, res) => {
    try {
        var rss = []
        rss = await Feed.load('https://www.saskatchewan.ca/Feeds/NewsFeed.ashx')
        var json = JSON.stringify(rss,null,3)
        data = JSON.parse(json)
        
        res.render('news', {article: json})
    } catch (err) {
        if(err.response) {
            res.render('news', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { article : null })
            console.log(err.requiest)
        } else {
            res.render('news', { article : null })
            console.error('Error', err.message)
        }
    } 

})




newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
        res.render('newsSearch', { article : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { article : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
