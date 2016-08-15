var express = require('express');
var app = express();

app.use(express.static('public'));
 
var hbs = require('hbs');
 
var bodyParser = require('body-parser');

var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(bodyParser());

app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});
 
app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);