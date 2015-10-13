
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var JSSDK = require('./jssdk.js');
var jssdk = new JSSDK('wxaebf83f8d1e738fe','7afe8a13e477195599294faf3e0a2e4e');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/',function(req,res){
	res.end('微信JSSDK');
});
app.post('/signPackage', function(req,res){
	jssdk.getSignPackage(req.body.url,function(signPackage){
		console.log(req.body.url);
		res.end(JSON.stringify(signPackage));
	});
});
app.post('/getUserInfo', function(req,res){
	jssdk.getUserInfo(req.body.code,function(userInfo){
		console.log(req.body.code);
		res.end(JSON.stringify(userInfo));
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
