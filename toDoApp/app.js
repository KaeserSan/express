var express = require('express');
// var pug = require('pug');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var hbs = require('hbs');
var path = require('path');
//var template = require('pug').compileFile( path.join(__dirname, '/views/layout.jade'));
var jade = require('jade');
var dateFormat = require('date-format');

var _tasks = require('./tasks');

var app = express();

app.locals.moment = require('moment');

app.set('views', path.join(__dirname, '/views'));
console.log(path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use( express.static('public') );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('stylus').middleware('public'));

app.get('/tasks', function(req, res, next) {
  res.render('tasks', {
    tasks: _tasks.getIncompleted(),
    path: req.path
  });
});

app.get('/completed', function(req, res, next) {
  res.render('completed', {
    title: 'Completed',
    tasks: _tasks.getAllCompleted(),
    path: req.path
  });
});

app.post('/tasks', function(req,res) {
	if ( !req.body || !req.body.name ) res.send ("error!");
  console.log("post");
	var nameTask = req.body.name;
	var newTask = {
		id : ++_tasks.counter,
		name: nameTask,
		completed: false,
    timeDateCreation: new Date(),
    timeDateCompletion: undefined
	};
	_tasks.push(newTask);
	res.redirect('/tasks');
});

app.delete('/tasks/:id', function(req, res, next){
	_tasks.delTask( req.params.id );
  res.status(200).send('task deleted!');
});

app.post('/complete/:id', function( req, res, next){
  _tasks.markCompleted( req.params.id );
  res.status(200).send('task deleted!');
});

app.post('/completeAll', function( req, res, next){
  _tasks.markAllCompleted( req.params.id );
  res.status(200).send('task deleted!');
});


app.listen(3000, function() {
	console.log("Listening on port 3000");
});