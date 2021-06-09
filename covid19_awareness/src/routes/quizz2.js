const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const quizRouter = express.Router();
quizRouter.use(bodyParser.json());
var fs = require('fs');

var quizes = JSON.parse(fs.readFileSync('./src/data/data.json', 'utf8'));

quizRouter.route('')
    .get((req, res, next) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                var text = "<!DOCTYPE html>"
                text = text +"<html><head>";
                text = text +"<title>Covid 19 awareness </title>";
                for (var i = 0; i < quizes.length; i++){
                   console.log("File data:", quizes['quiz'][i].title);
                   text = text + "<h1>Name:" + quizes['quiz'][i].title + "</h1><hr><br>" + "<p> " + quizes['quiz'][i].description + "</p><br><hr>";
                    res.end(text);
                res.end("</head></html>")
            }}), (err) => next(err)
            .catch((err) => next(err))
    
    .put((req, res, next) => {
        res.statusCode = 403 /*Not supported*/
        res.end('PUT operation not supported on /quizes');
    });
quizRouter.route('/quizzes/:title')
    .get((req, res, next) => {
        Quizes.find(req.params.title)
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                var html = "<p style = 'text-align: center'><b>" + quiz.name + "</b></p><b>Instructions: </b>" + quiz.instructions + "<br>";
                html = html + "<b>Duration: </b>" + quiz.duration.hours + ":" + quiz.duration.minutes + ":" + quiz.duration.seconds + "<hr>";
                var num = 1;
                for (var i = 0; i < quiz.questions.length; i++) {
                  if (!quiz.questions[i].isEnabled)
                      continue;
                  html = html + num + ". " + quiz.questions[i].question + "  -  " + quiz.questions[i]._id + "<br><div style = 'margin: 10px'>";
                  num = num + 1;
                  for (var j = 0; j < quiz.questions[i].answers.length; j++) {
                    html = html + (j+1) + ". " + quiz.questions[i].answers[j].option + "<br>";
                  }
                  html = html + "</div><b> Answer: </b>" + quiz.questions[i].answer + "<br><b>Explanation: </b>" + quiz.questions[i].explanation + "<br><hr>";
                }
                res.end(html);
            }, (err) => next(err)).catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403 /*Not supported*/
        res.end('POST operation not supported on /quizes/'
            + req.params.title);
    });

/*___________________________________________________*/
/*___________________________________________________*/
/*___________________________________________________*/


quizRouter.route('/:title/questions')
    .get((req, res, next) => {
        Quizes.findOne(req.params.title)
            .then((quiz) => {
                if (quiz != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(quiz.questions);
                }
                else {
                    err = new Error('Quiz ' + req.params.title + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403 /*Not supported*/
        res.end('PUT operation not supported on /quizes'
            + req.params.title + '/questions');
    });


quizRouter.route('/:title/questions/:title')
    .get((req, res, next) => {
        Quizes.findById(req.params.title)
            .then((quiz) => {
                if (quiz != null && quiz.questions.id(req.params.title) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(quiz.questions.id(req.params.title));
                }
                else if (quiz == null) {
                    err = new Error('Quiz ' + req.params.title + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
                else {
                    err = new Error('Question ' + req.params.title + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403 /*Not supported*/
        res.end('POST operation not supported on /quizes/'
            + req.params.title + '/questions' + req.params.title);
    });


module.exports = quizRouter;