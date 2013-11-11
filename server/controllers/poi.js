
var mongo = require('mongodb');
var config = require('../../config');
var dbAddress = config['mongo.host'] + ':' + config['mongo.port'] + '/' + config['mongo.name'];

function connect( cb ){
  mongo.MongoClient.connect( 'mongodb://' + dbAddress, function( err, db ) {
    if( err ) return cb( err );
    var collection = db.collection('poi'); // collection name
    return cb( null, collection );
  });
}

// { title: 'untitled', geo: { lat: 12.46876, lng: 125.698438 } }

module.exports = function( app ){

  connect( function( err, collection ){

    if( err ) console.error( 'err', err );

    // list all pois
    app.get( '/poi', function( req, res ){
      collection.find().toArray(function(err, results) {
        if( err ){ return res.json( 400, err ); }
        return res.json( 200, results );
      });
    });

    // add/update poi
    app.post( '/poi', function( req, res ){

      if( req.body ){
        if( req.body.geo && req.body.geo.lat && req.body.geo.lng ){

          var poi = req.body;

          if( 'string' === typeof poi._id && poi._id.length ){
            var id = mongo.ObjectID( poi._id );
            delete poi._id;
            console.log( 'update', id, poi );
            collection.update( { _id: id }, poi, function( err, doc ) {
              if( err ){ return res.json( 400, err ); }
              return res.json( 200, 'OK' );
            });
          }
          else {
            collection.insert( poi, function( err, docs ) {
              if( err ){ return res.json( 400, err ); }
              return res.json( docs[0] );
            });
          }
        }
        else return res.json( 400, 'INVALID GEO' );
      }
      else return res.json( 400, 'INVALID POI' );
    });
    //collection.dosomething

  });
}