var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var stylus = require('stylus');
var fs = require('fs');

const crypto = require('crypto');
const hashSha1 = crypto.createHash('sha1');

// hash.update('some data to hash');
// console.log(hash.digest('hex'));


var PORT = process.argv[2]||3000;

var app = express();
 
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(bodyparser.urlencoded({extended: false}));
app.use(require('stylus').middleware(process.argv[3] || 'public'));
app.use(express.static( process.argv[3] || 'public' ));

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});

app.post('/form', function(req, res) {
    res.send(req.body.str.split("").reverse().join(""));
});

app.param('id', function (req, res, next, id) {
	req.id = id;
	hashSha1.update(new Date().toDateString() + id);
	req.hash = hashSha1.digest('hex');
	next();
});


app.put('/message/:id', function(req, res) {
    res.send(req.hash);
});

app.get('/search', function(req, res) {
    res.send(req.query);
});

app.get('/books', function(req, res) {
	fs.readFile(process.argv[3], 'utf8', function(err, data){
		if (err) { throw err;}
		jData = JSON.parse( data );
		res.json( jData );
	});

    // res.json( data );
});

app.on('listening', (req, res) => 'Listening on port: '+ PORT);
 
app.listen( PORT );


/*
new Date.toDateString()



<h1>Hello World</h1><p>Today is Tue Aug 09 2016</p>
<h1>Hello World</h1><p>Today is Tue Aug 09 2016.</p>



*/