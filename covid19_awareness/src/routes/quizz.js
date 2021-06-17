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
    var addQuiz = JSON.stringify(jsonObj)
    console.log(addQuiz)
    try {
        console.log("File data:", jsonObj['quiz']);
        res.statusCode = 200;
        if((globalUsername == "EnaHo" && globalPassword == "1234") || (globalUsername == "Kirakira" && globalPassword == "1234"))
        { 
            res.render('quizzes', {quizzes: quizes['quiz'], request: "set", addQuiz: jsonObj['quiz'], quizID: null})
        }
        else
        {
            res.render('quizzes', {quizzes: quizes['quiz'], request: null,  addQuiz: jsonObj['quiz'], quizID: null})
        }
        
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

quizzRoute.get('/:name', async(req, res) => {
    let questionTT = req.params.name
    try {
            res.render('addNew', { title: questionTT})
        } catch (err) {
            if(err.response) {
                res.render('addNew', { quizz : null })
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if(err.requiest) {
                res.render('addNew', { quizz : null })
                console.log(err.requiest)
            } else {
                res.render('addNew', { quizz : null })
                console.error('Error', err.message)
            }
        } 
})

quizzRoute.post('/addNew', async(req, res) => {
    let title = req.body.title
    console.log(title)
    let description = req.body.description
    let path = req.body.path
    let qTitle = req.body.qTitle
    let optionY = req.body.optionY
    let titleY = req.body.titleY
    let descriptionY = req.body.descriptionY
    let yes = req.body.yes
    let optionN = req.body.optionN
    let titleN = req.body.titleN
    let descriptionN = req.body.descriptionN
    let no = req.body.no

    jsonObj.quiz.push({
                    title: title,
                    description: description,
                    path: path,
                    question: 
                    {
                        title: qTitle,
                        answers: [
                        {
                            option: optionY,
                            title: titleY,
                            description: descriptionY,
                            correctAnswer: yes
                        },
                        {
                            option: optionN,
                            title: titleN,
                            description: descriptionN,
                            correctAnswer: no
                        }]
                    }
                });


    console.log(jsonObj);
    try {
            fs.writeFileSync("./src/data/addQues.json", JSON.stringify(jsonObj))
            res.render('addNew', { title: title})
        } catch (err) {
            if(err.response) {
                res.render('addNew', { quizz : null })
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if(err.requiest) {
                res.render('addNew', { quizz : null })
                console.log(err.requiest)
            } else {
                res.render('addNew', { quizz : null })
                console.error('Error', err.message)
            }
        } 
})

// get one quiz question
quizzRoute.get('/:name/:id', async(req, res) => {
    let questionTT = req.params.name
    let questionID = req.params.id
    questions = JSON.stringify(quizes['quiz'])
    switch(questionTT)
    {
        case("safe"):
        {
            questionTT = "0"
            break;
        }
        case("protective_measures"):
        {
            questionTT = "1"
            break;
        }
        case("myth_busters"):
        {
            questionTT = "2"
            break;
        }
        default:
            break;

    }
    console.log(questionTT)
    try {
        res.render('quizz', { quizzes : questions, title: questionTT, quesID: questionID, quizID: null })
    } catch (err) {
        if(err.response) {
            res.render('quizz', { quizz : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('quizz', { quizz : null })
            console.log(err.requiest)
        } else {
            res.render('quizz', { quizz : null })
            console.error('Error', err.message)
        }
    } 
})
quizzRoute.get('/:name/:Qid/:id', async(req, res) => {
    let questionTT = req.params.name
    let questionID = req.params.id
    let quizID = req.params.Qid
    questions = JSON.stringify(jsonObj['quiz'])
    try {
        res.render('quizz', { quizzes : questions, title: questionTT, quesID: questionID, quizID: quizID })
    } catch (err) {
        if(err.response) {
            res.render('quizz', { quizz : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('quizz', { quizz : null })
            console.log(err.requiest)
        } else {
            res.render('quizz', { quizz : null })
            console.error('Error', err.message)
        }
    } 
})



module.exports = quizzRoute 