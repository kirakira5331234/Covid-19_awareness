const express = require('express')
const newsSingle = express.Router()
const axios = require('axios')
const cheerio = require("cheerio")
var Feed = require('rss-to-json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );



newsSingle.get('', async(req, res) => {
    rss = await Feed.load('https://www.saskatchewan.ca/Feeds/NewsFeed.ashx')
    var json = JSON.stringify(rss,null,3)
    data = JSON.parse(json)
    let articleID = data.items[0].link
    console.log(articleID)
    try {
	        const newsAPI = await axios.get(articleID)
		   	const $ = await cheerio.load(newsAPI.data);
		   	let dataNews = []
		   	var paragraph1
			$("body").each((i,elem) => {
		       dataNews.push({
		           title: $(elem).find("1").text(),
		           paragraph: '<p>' + $(elem).find("p").text()
		           + '</p>',
		           link: $(elem).find("img").attr('alt src')
		       })
		       paragraph1 = '<p>' + $(elem).find("p").text() + '</p>'
		   	})
	   console.log(paragraph1)
	   res.setHeader('Content-Type', 'text/html');
	   res.end("<h1>"+dataNews[0].paragraph+"</h1>")
       //console.log(newsAPI.data)
        res.render('newsSingle', { article : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})

module.exports = newsSingle 