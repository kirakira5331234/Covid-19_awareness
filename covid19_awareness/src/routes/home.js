const express = require('express')
const homeRouter = express.Router()
const axios = require('axios')

homeRouter.get('/', function (req, res, next){
	res.render('home', {
		title: 'Express',
		name: 'Covid 19'
	})
});
module.exports = homeRouter;