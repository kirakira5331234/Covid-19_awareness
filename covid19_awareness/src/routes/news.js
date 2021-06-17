const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');
var Feed = require('rss-to-json');
const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


var home = require('./home');
var image = ''
var title = 'a'
var time_stamp = ''
var links = ''

newsRouter.get('', async(req, res) => {
    try {
        var location = globalLocation
        var page = ''
        console.log(location)
        var image1 =[]
        var title1 = []
        var time_stamp1 = []
        var links1 = []
        switch(location)
        {
            case ("SK"):
                page = 'https://www.saskatchewan.ca/Feeds/NewsFeed.ashx'
                break;
            case("MB"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            case("BC"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            case("QC"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            case("AB"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            case("YT"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b' 
                break;
            case("ON"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            case("NB"):
                page = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/feature-stories?healthtopics=b6bd35a3-cf4f-4851-8e80-85cb0068335b'
                break;
            default:
                break;
        }
        if(location == "SK")
        {
            var rss = []
            rss = await Feed.load(page)
            console.log(rss)
            var json = JSON.stringify(rss,null,3)
            data = JSON.parse(json)
            res.render('news', {article: json, image: null})
        }
        else
        {
            const browser = await puppeteer.launch();
            pages = await browser.newPage();
            (async () => {
              const browser = await puppeteer.launch();
              const pages = await browser.newPage();

              await pages.goto(page);
              var i = '1'
              var k = 1
              let articles = await pages.$eval('#PageContent_C007_Col01', (el) => el.innerText);
              const temp = articles.split('\n\n');
              console.log(temp.length)
              var dem = 0
              for (count =0; count< (temp.length)-1; count+=2)
              {
                time_stamp1[dem] = temp[count];
                title1[dem] = temp[count+1]
                dem++
              }
              for(count =0; count < title1.length; count++)
              {//let title = await page.$eval('#PageContent_C007_Col01 > div > div:nth-child('+i+') > a > div.table-cell.info > p', (el) => el.innerText);
                  image1[count] = await pages.$eval('#PageContent_C007_Col01 > div > div:nth-child('+i+') > a > div:nth-child(1) > div >div', thumb => thumb.style.backgroundImage);
                  links1[count] = await pages.$eval('#PageContent_C007_Col01 > div > div:nth-child('+i+') > a',  (el) => el.href);
                  k++
                  i = k.toString(10)
                }
            title = JSON.stringify(title1)
            image = JSON.stringify(image1)
            links = JSON.stringify(links1)
            time_stamp = JSON.stringify(time_stamp1)
            console.log(title)
            res.render('news', {article: title, image: image, link: links, time_stamp: time_stamp })
        })();
            //var json = news
        
    }
    
}
     catch (err) {
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
