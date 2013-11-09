
app.controller( 'MapIndexController', function( $scope ) {

  $scope.tweets = [];

  // be kind to the browsers memory and delete old tweets every 10 secs
  setInterval( function(){
    $scope.tweets = $scope.tweets.splice(-30);
  }, 10000 );

  function addTweet( tweet )
  {
    var popup = L.popup()
        .setLatLng( tweet.geo.coordinates )
        .setContent( tweet.text )
        .addTo( $scope.map );

    // console.log( popup );

    setTimeout( function(){
      popup._close();
    }, 8000 );
  }

  var datestamp = (''+new Date().getTime()).slice(0,10);
  // console.log( 'datestamp', datestamp );

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

  $scope.map.setView( [ 12.46876, 118.698438 ], 6 );

  tweets.local.on( 'child_added', function( message ){

    var tweet = message.val();
    addTweet( tweet );
    // console.log( 'local', tweet );
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
    // console.log( 'push tweet', tweet.text );
    $scope.$apply( function(){
      if( tweet.entities ){
        if( Array.isArray( tweet.entities.user_mentions ) ){
          for( var i=0; i<tweet.entities.user_mentions.length; i++ ){
            tweet.text = tweet.text.replace( '@'+tweet.entities.user_mentions[i].screen_name, function( name ){
              return '<a href="https://twitter.com/'+name.substr(1)+'" target="_new">'+name+'</a>';
            });
          }
        }
        if( Array.isArray( tweet.entities.hashtags ) ){
          for( var i=0; i<tweet.entities.hashtags.length; i++ ){
            tweet.text = tweet.text.replace( '#'+tweet.entities.hashtags[i].text, function( tag ){
              return '<a href="https://twitter.com/search?q='+tag.substr(1)+'&src=typd" target="_new">'+tag+'</a>';
            });
          }
        }
        if( Array.isArray( tweet.entities.urls ) ){
          for( var i=0; i<tweet.entities.urls.length; i++ ){
            tweet.text = tweet.text.replace( tweet.entities.urls[i].url, function( link ){
              return '<a href="'+link+'" target="_new">'+link+'</a>';
            });
          }
        }
        // console.log( JSON.stringify( tweet.entities.urls ) );
      }
      $scope.tweets.push( tweet );
    });

    // if( tweet.text.match( /yfrog|twitpic|twimg|twitter|img|pic/ ) ){
    //   console.log( tweet.text );
    // }

    // if( tweet.entities ){
      // console.log( 'tweet.entities', tweet.entities );
      // if( tweet.entities.urls ){
      //   console.log( tweet.entities.urls.map( function( url ){
      //     return url.display_url;
      //   }));
      // }
    // }
  });

});