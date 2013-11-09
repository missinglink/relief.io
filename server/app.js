
var path = require( 'path' );
var express = require( 'express' );
var flash = require( 'connect-flash' );
var config = require('../config' );

// Express
app = express();
app.set( 'env', 'development' );
app.set( 'port', config['http.port'] );
app.set( 'baseDir', path.resolve( __dirname + '/..' ) );

// Static route should come before authentication
app.use( '/', express.static( app.get( 'baseDir' ) + '/public' ) );

// Authentication
// app.use( express.logger() );
app.use( express.cookieParser() );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.session({ secret: 'fsdffsdfsdfsfsdfd' }));
app.use( flash() );
app.configure(function(){
  app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.flash = req.flash();
    next();
  });
});

// Templating
app.set( 'views', app.get( 'baseDir' ) + '/public' ); 
app.set( 'view engine', 'jade' );
app.set( 'view options', { layout: false } );

// Routes
app.get( '/', function( req, res ){ res.render( 'index' ); });

// Controllers
require( './controllers/example' )( app );

// We're up & running!
app.listen( config['http.port'] );
console.log( "Server running in env %s on port %d", app.get( 'env' ), app.get( 'port' ) );