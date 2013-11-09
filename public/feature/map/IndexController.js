
app.controller( 'MapIndexController', function( $scope ) {

  $scope.tweets = [];

  // be kind to the browsers memory and delete old tweets every 10 secs
  setTimeout( function(){
    $scope.tweets = $scope.tweets.splice(-30);
  }, 10000 );

  function addTweet( tweet )
  {
    var popup = L.popup()
        .setLatLng( tweet.geo.coordinates )
        .setContent( tweet.text )
        .addTo( $scope.map );

    console.log( popup );

    setTimeout( function(){
      popup._close();
    }, 5000 );
  }

  var datestamp = (''+new Date().getTime()).slice(0,10);
  console.log( 'datestamp', datestamp );

  var myRootRef = new Firebase('https://reliefio.firebaseio.com');
  var tweets = {
    local: myRootRef.child('tweet_local').limit(5),
    overseas: myRootRef.child('tweet_overseas').limit(5),
    all: myRootRef.child('tweet').limit(5)
  }

  $scope.map = L.map('map');

	L.tileLayer.provider('Nokia.terrainDay', {
	  devID: 'pT52rESblK2luN6D0562LQ',
	  appId: 'yKqVsh6qFoKdZQmFP2Cn'
	}).addTo($scope.map);

  $scope.map.setView( [ 12.46876, 123.698438 ], 6 );

  tweets.local.on( 'child_added', function( message ){

    var tweet = message.val();
    addTweet( tweet );
    console.log( 'local', tweet );
  });

  // tweets.overseas.on( 'child_added', function( message ){

  //   var tweet = message.val();
  //   addTweet( tweet );
  //   console.log( 'overseas', tweet.text );
  // });

  tweets.all.on( 'child_added', function( message ){

    var tweet = message.val();
    // console.log( 'tweet', message.val() );
    // $.flash(tweet.text);
    console.log( 'push tweet', tweet.text );
    $scope.$apply( function(){
      $scope.tweets.push( tweet );
    });
  });

});