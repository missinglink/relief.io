
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/map', {
      controller: 'MapIndexController',
      templateUrl: '/feature/map/index.html'
    })
});