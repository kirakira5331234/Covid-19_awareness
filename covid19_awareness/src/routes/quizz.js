const express = require('express')
const quizzRoute = express.Router()
const axios = require('axios')
const cheerio = require("cheerio")
var Feed = require('rss-to-json');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
var fs = require('fs');
var quizes = JSON.parse(fs.readFileSync('./src/data/data.json', 'utf8'));


// get all quiz questions
quizzRoute.get('', async (req, res) => {
    try {
        console.log("File data:", quizes.quiz[0].title);
        res.statusCode = 200;
        res.render('quizzes', {quizzes: quizes['quiz']})
    } catch (err) {
        if(err.response) {
            res.render('quizzes', { quizzes : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('quizzes', { quizzes : null })
            console.log(err.requiest)
        } else {
            res.render('quizzes', { quizzes : null })
            console.error('Error', err.message)
        }
    } 
})



// get one quiz question
quizzRoute.get('/:title', async(req, res) => {
    let questionTT = req.params.title
    console.log(req.params.title)
    try {
        res.render('question', { quizz : req.params.title })
    } catch (err) {
        if(err.response) {
            res.render('question', { quizz : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('question', { quizz : null })
            console.log(err.requiest)
        } else {
            res.render('question', { quizz : null })
            console.error('Error', err.message)
        }
    } 
})




module.exports = quizzRoute 