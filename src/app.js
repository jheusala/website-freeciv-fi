
/**
 * Module dependencies.
 */

var express = require('express'),
    request = require('request'),
    app = module.exports = express.createServer(),
	io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
	res.render('index', {title: 'Our site'});
});

app.listen(3000);

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
