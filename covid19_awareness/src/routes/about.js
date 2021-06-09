const express = require('express')
const aboutRouter = express.Router()
const axios = require('axios')

aboutRouter.get('', function(req, res) {
  res.render('about', {
    page: 'about',
    title: 'About_page',
    errors: []
  });
});

module.exports = aboutRouter;
