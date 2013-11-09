
var mongo = require('mongodb');
var config = require('../../config');
var dbAddress = config['mongo.host'] + ':' + config['mongo.port'] + '/' + config['mongo.name'];

function connect( cb ){
  mongo.MongoClient.connect( 'mongodb://' + dbAddress, function( err, db ) {
    if( err ) return cb( err );
    var collection = db.collection('example'); // collection name
    return cb( null, collection );
  });
}

module.exports = function( app ){

  connect( function( err, collection ){

    if( err ) console.error( 'err', err );
    //collection.dosomething

  });
}