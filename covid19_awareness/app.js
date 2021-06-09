const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended : true }))

// Routes
const newsSingle = require('./src/routes/newsSingle')
const newsRouter = require('./src/routes/news')
const Home = require('./src/routes/home')
const quizz = require('./src/routes/quizz')
const about = require('./src/routes/about')

app.use('/', Home)
app.use('/article', newsRouter)
app.use('/article/covid19', newsSingle)
app.use('/quizzes', quizz)
app.use('/about', about)

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))