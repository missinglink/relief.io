
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/twitter', {
      controller: 'TwitterIndexController',
      templateUrl: '/feature/twitterwidget/index.html'
    })
});