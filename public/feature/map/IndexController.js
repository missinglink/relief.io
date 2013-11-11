

app.controller( 'MapIndexController', function( $rootScope, $scope, Firebase, MapService, PoiService, safeApply ) {

  // Init the map
  $scope.map = MapService.map;

  $scope.tweets = [];
  $scope.loadedTweets = [];

  $rootScope.$on( 'poi:new', function(){
    PoiService.save( {
        title: '',
        description: '',
        icon: 'dot-circle-o',
        color: 'blue',
        geo: $scope.map.getCenter()
      }, function( res ){
      console.log( 'poi new', res.status, res.data );
      MapService.updateMarker( res.data, true );
      $rootScope.$emit( 'poi:select', res.data._id );
    });
  });

  $rootScope.$on( 'poi:draggable', function( event, id, bool ){
    var marker = MapService.findMarker( id );
    if( marker ){
      if( bool ){ marker.dragging.enable(); }
      else { marker.dragging.disable(); }
    }
  });

  $rootScope.$on( 'poi:update', function( event, poi ){
    PoiService.save( poi, function( res ){
      console.log( 'poi update', res.status, res.data );
    });
  });

  // wait for all child scopes to load
  $scope.$on( '$viewContentLoaded', function(){

    PoiService.loadAll( function( res ){
      if( res && res.status === 200 && Array.isArray( res.data ) && res.data.length ){
        for( var i=0; i<res.data.length; i++ ){
          console.log( 'load marker' );
          MapService.updateMarker( res.data[i] );
        }
        console.log( 'poi:select', res.data[0]._id );
        $rootScope.$emit( 'poi:select', res.data[0]._id );
      }
    });

  });

 // Be kind to the browsers memory and delete old tweets every 10 secs
  setInterval( function(){
    $scope.tweets = $scope.tweets.splice(-30);
  }, 10000 );

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
  var firebase = Firebase.host;
  var tweets = {
    local: firebase.child('tweet_local').limit(5),
    overseas: firebase.child('tweet_overseas').limit(5),
    all: firebase.child('tweet').limit(5)
  };


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
    safeApply( $scope, function(){
      $scope.tweetsCount ++;
    });
  };

  formatTweet = function(tweet) {
    safeApply( $scope, function(){
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
        // console.log( JSON.stringify( tweet.entities.urls ) );
      }
    });

  };

  // On overseas tweets
  // tweets.overseas.on( 'child_added', function( message ){
  //   var tweet = message.val();
  //   addTweet( tweet );
  //   console.log( 'overseas', tweet.text );
  // });

  tweets.all.on( 'child_added', function( message ){
    var tweet = message.val();
    if($scope.loadedTweets.length < 6) {
      formatTweet(tweet);
      $scope.loadedTweets.push( tweet );
    } else {
      $scope.tweets.push( tweet );
      updateTweetCount()
    }

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

  navigator.geolocation.getCurrentPosition(
      function(pos) {
        // Successful! 
        /*
        alert(
          pos.coords.latitude + ":" + pos.coords.longitude + ":" + pos.coords.accuracy
        );
        */
        console.log("Latitude: " + pos.coords.latitude);
        console.log("Longitude: " + pos.coords.longitude);

        $('#login-lon').val([ pos.coords.longitude ]);
        $('#login-lat').val([ pos.coords.latitude ]);
        //$('#login-loc').val();

        /*
        var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 17);

        L.tileLayer('http://{s}.tile.cloudmade.com/233b2eebc57a4adcb92e00d5cd40a90e/997/256/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: 18
        }).addTo(map);

        var marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
        */
    }, function(error) {
      alert("Error!");
    },
    {
      // Options for geolocation
      maximumAge: 10000,
      timeout: 10000,
      enableHighAccuracy: true
    }
    );
});