
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

var helpers = require('express-helpers')(app);
 
// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://livetrackuser:LiveTrack@ds037067.mongolab.com:37067/livetrack');  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://livetrackuser:LiveTrack@ds037067.mongolab.com:37067/livetrack');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://livetrackuser:LiveTrack@ds037067.mongolab.com:37067/livetrack');
});

/**
* ROUTING
* -------------------------------------------------------------------------------------------------
* include a route file for each major area of functionality in the site
**/
app.get('/', routes.index);
require('./routes/sites')(app);
require('./routes/versions')(app);
require('./routes/tags')(app);
require('./routes/reports')(app);

// Global Routes - this should be last!
require('./routes/global')(app);

app.listen(process.env.port || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);