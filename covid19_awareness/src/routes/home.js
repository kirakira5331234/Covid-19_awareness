const express = require('express')
const homeRouter = express.Router()
const axios = require('axios')
const alert = require('alert'); 
global.globalLocation = ' '
global.globalUsername = 'abc'
global.globalPassword = 'abc'
homeRouter.get('/', function (req, res, next){
	res.render('home', {
		title: null,
		name: 'Covid 19'
	})
});

homeRouter.post("/", function(req, res){
	globalLocation = req.body.location1;
	res.render('home', {
		title: null,
		name: 'Covid 19'
	})

});

homeRouter.post("/login", function(req, res){
	globalUsername = req.body.username;
	globalPassword = req.body.password;
	console.log(globalUsername)
	if((globalUsername == "EnaHo" && globalPassword == "1234") || (globalUsername == "Kirakira" && globalPassword == "1234"))
	{
		res.render('home', {
			title: 'Welcome to '+ globalUsername,
			name: 'Covid 19'
		})
	}
	else
	{
		alert("Administrator account does not exist");
		res.render('home', {
			title: null,
			name: 'Covid 19'
		})
	}

});


module.exports = homeRouter;
