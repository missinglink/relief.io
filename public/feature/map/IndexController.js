
app.controller( 'MapIndexController', function( $rootScope, $scope ) {
  $scope.tweets = [];
  $scope.loadedTweets = [];

  // Create a new popup on the map
  function addTweet( tweet ){
    var popup = L.popup()
        .setLatLng( tweet.geo.coordinates )
        .setContent( tweet.text )
        .addTo( $scope.map );
    // console.log( popup );

    // Close it after some time
    setTimeout( function(){
      popup._close();
    }, 8000 );
  }

  // Connect to firebase to get tweets
  var myRootRef = new Firebase( $rootScope.config['firebase.host'] );
  var tweets = {
    local: myRootRef.child('tweet_local').limit(5),
    overseas: myRootRef.child('tweet_overseas').limit(5),
    all: myRootRef.child('tweet').limit(5)
  };

  // Init the map
  $scope.map = L.map( 'map', { zoomControl:false } );
  L.tileLayer.provider('Nokia.terrainDay', {
    devID: 'pT52rESblK2luN6D0562LQ',
    appId: 'yKqVsh6qFoKdZQmFP2Cn'
  }).addTo( $scope.map );

  // Center map
  $scope.map.setView( [ 12.46876, 118.698438 ], 6 );

 // On local (philippine) tweets
  tweets.local.on( 'child_added', function( message ){
    var tweet = message.val();
    addTweet( tweet );
    // console.log( 'local', tweet );
  });

  $scope.tweetsCount = 0;

  $scope.loadMoreTweets = function(amount, message) {
    $scope.loadedTweets = $scope.tweets.slice(0,4);
     $scope.tweetsCount -= 5;
  };

  updateTweetCount = function(tweet) {
    $scope.$apply( function(){
      $scope.tweetsCount ++;
    });
  };

  formatTweet = function(tweet) {
    $scope.$apply( function(){
      if( tweet.entities ){
        if( Array.isArray( tweet.entities.user_mentions ) ){
          for( var i=0; i<tweet.entities.user_mentions.length; i++ ){
            tweet.text = tweet.text.replace( '@'+tweet.entities.user_mentions[i].screen_name, function( name ){
              return '<a href="https://twitter.com/'+name.substr(1)+'" target="_blank">'+name+'</a>';
            });
          }
        }
        if( Array.isArray( tweet.entities.hashtags ) ){
          for( var i=0; i<tweet.entities.hashtags.length; i++ ){
            tweet.text = tweet.text.replace( '#'+tweet.entities.hashtags[i].text, function( tag ){
              return '<a href="https://twitter.com/search?q='+tag.substr(1)+'&src=typd" target="_blank">'+tag+'</a>';
            });
          }
        }
        if( Array.isArray( tweet.entities.urls ) ){
          for( var i=0; i<tweet.entities.urls.length; i++ ){
            tweet.text = tweet.text.replace( tweet.entities.urls[i].url, function( link ){
              return '<a href="'+link+'" target="_blank">'+link+'</a>';
            });
          }
        }
      }
    });
  };

  tweets.all.on( 'child_added', function( message ){
    var tweet = message.val();
    if($scope.loadedTweets.length < 6) {
      formatTweet(tweet);
      $scope.loadedTweets.push( tweet );
    } else {
      $scope.tweets.push( tweet );
      updateTweetCount()
    }
  });
});