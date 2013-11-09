
var config = require('../../config');
var twitterService = require('../services/twitter');

var Firebase = require('firebase');
var myRootRef = new Firebase( config['firebase.host'] );

var tweets = {
  local: myRootRef.child('tweet_local'),
  overseas: myRootRef.child('tweet_overseas'),
  all: myRootRef.child('tweet')
}

twitterService.on( 'tweet_local', function( tweet ){
  tweets.local.push( tweet );
});

twitterService.on( 'tweet_overseas', function( tweet ){
  tweets.overseas.push( tweet );
});

twitterService.on( 'tweet', function( tweet ){
  tweets.all.push( tweet );
});